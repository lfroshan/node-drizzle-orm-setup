import { Request } from "express";

import db from "../../db";
import { UserToken } from "../../db/postgres/schema/userToken.schema";

/**
 * Saves the user refresh token in database for future.
 * 
 * @param {Express.Request} req - contains updateAt value injected by global middleware.
 * @param {Record<string, any>[]} user - user data fetched from database.
 * @param {string} refreshToken - refresh token of user.
 */
export async function saveUserTokenInDatabase(req: Request, user: Record<string, any>[], refreshToken: string): Promise<void> {
  const userToken = {
    token: refreshToken,
    // updatedAt date is always included in POST request.
    updatedAt: req.body.updatedAt,
    userId: user.at(0)?.id
  };

  await db.insert(UserToken).values(userToken);
}
