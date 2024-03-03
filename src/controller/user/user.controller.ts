import { eq, or } from "drizzle-orm";
import { Request, Response } from "express";

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
import { saveUserTokenInDatabase } from "../../service/user/saveUserToken";
import { UserRegisterPayload } from "../../zod.domain/user/userRegister.domain";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/security/tokenHelper";

/**
 * User Registration Controller.
 * Duty:
 * 1. Create a user account.
 * 2. Creates Access token.
 * 3. Creates Refresh token.
 * 4. Saves Refresh token.
 */
export async function registerUser(req: Request, res: Response): Promise<any> {
  const userPayload: UserRegisterPayload = req.body;

  if (userPayload.password !== userPayload.confirmPassword)
    throw new Exception(STATUS_CODES.BAD_REQUEST, VALIDATION_ERRORS.PASSWORD_NOT_MATCHED);

  const userData = await prepareUserData(userPayload);
  const user = await db.insert(User).values(userData).returning({ id: User.id });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveUserTokenInDatabase(req, user, refreshToken);

  Return(res, STATUS_CODES.CREATED, { accessToken, refreshToken });
}

/**
 * User login Controller.
 * Duty:
 * 1. Creates Access token.
 * 2. Creates Refresh token.
 * 3. Saves refresh token.
 */
export async function loginUser(req: Request, res: Response): Promise<any> {
  const loginPayload: UserLoginPayload = req.body;

  const user = await db.select()
    .from(User)
    .where(
      or(
        eq(User.email, loginPayload.username),
        eq(User.username, loginPayload.username)
      )
    );

  if (!(await verifyToken(loginPayload.password, user)))
    throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveUserTokenInDatabase(req, user, refreshToken);

  Return(res, STATUS_CODES.OK, { accessToken, refreshToken });
}

/**
 * User token refresh controller.
 * Duty:
 * 1. Creates Access token.
 * 2. Creates Refresh token.
 * 3. Saves refresh token.
 */
export async function refreshToken(req: Request, res: Response): Promise<any> {
  const { userId } = req.body.userId;

  if (!userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

  const user = await db.select().from(UserToken).where(eq(UserToken.userId, userId));

  if (!user.at(0))
    throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  saveUserTokenInDatabase(req, user, refreshToken);

  Return(res, STATUS_CODES.OK, { accessToken, refreshToken });
}
