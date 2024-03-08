import { eq, or } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";

import db from '../../db/index';
import { Exception } from "../../error/Exception";
import { Return } from "../../utils/successResponse";
import { STATUS_CODES } from "../../constants/statusCodes";
import { User } from "../../db/postgres/schema/user.schema";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { VALIDATION_ERRORS } from "../../constants/validationError";
import { prepareUserData } from "../../service/user/prepareUserData";
import { UserToken } from "../../db/postgres/schema/userToken.schema";
import { UserLoginPayload } from "../../zod.domain/user/userLogin.domain";
import { UserRegisterPayload } from "../../zod.domain/user/userRegister.domain";
import { saveUserTokenInDatabase, updateUserToken } from "../../service/user/saveUserToken";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/security/tokenHelper";

/**
 * User Registration Controller.
 * Duty:
 * 1. Create a user account.
 * 2. Creates Access token.
 * 3. Creates Refresh token.
 * 4. Saves Refresh token.
 */
export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const userPayload: UserRegisterPayload = req.body;

    if (userPayload.password !== userPayload.confirmPassword)
      throw new Exception(STATUS_CODES.BAD_REQUEST, VALIDATION_ERRORS.PASSWORD_NOT_MATCHED);

    const userData = await prepareUserData(userPayload);
    const user = await db.insert(User).values(userData).returning({ id: User.id });

    const accessToken = generateAccessToken(user.at(0)?.id);
    const refreshToken = generateRefreshToken(user.at(0)?.id);

    await saveUserTokenInDatabase(req, user, refreshToken);

    Return(res, STATUS_CODES.CREATED, { accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
}

/**
 * User login Controller.
 * Duty:
 * 1. Creates Access token.
 * 2. Creates Refresh token.
 * 3. Saves refresh token.
 */
export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<any> {

  try {
    const loginPayload: UserLoginPayload = req.body;

    const user = await db.select()
      .from(User)
      .where(
        or(
          eq(User.email, loginPayload.username),
          eq(User.username, loginPayload.username)
        )
      );

    if (!user.at(0)?.id) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (!(await verifyToken(loginPayload.password, user)))
      throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    const accessToken = generateAccessToken(user.at(0)?.id);
    const refreshToken = generateRefreshToken(user.at(0)?.id);

    await updateUserToken(user, refreshToken);

    Return(res, STATUS_CODES.OK, { accessToken, refreshToken });
  } catch (err) {
    next(err);
  }

}

/**
 * User token refresh controller.
 * Duty:
 * 1. Creates Access token.
 * 2. Creates Refresh token.
 * 3. Saves refresh token.
 */
export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { userId } = req.body.userId;

    if (!userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    const userToken = await db.select({ id: UserToken.id, userId: UserToken.userId }).from(UserToken).where(eq(UserToken.userId, userId));

    if (!userToken.at(0))
      throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    updateUserToken(userId, refreshToken);

    Return(res, STATUS_CODES.OK, { accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
}

/**
 * Checks if a User exists with the given username or email.
 */
export async function accountExists(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const user = await db.select()
      .from(User)
      .where(or
        (eq(User.email, req.body.email),
          eq(User.username, req.body.username))
      );

    if (user.at(0)?.id) throw new Exception(STATUS_CODES.CONFLICT, ERROR_MESSAGES.CONFLICT);

    Return(res, STATUS_CODES.OK, {});
  } catch (err) {
    next(err);
  }
}
