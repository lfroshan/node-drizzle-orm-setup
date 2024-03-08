import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ENV_CONFIGS } from "../../config/envConfigs";

/**
 * Generates a new user access token based on user id.
 * 
 * @param user - The User record.
 * @returns access token.
 */
export function generateAccessToken(userId: string | undefined): string {
  return jwt.sign({ userId: userId }, ENV_CONFIGS.accessTokenKey, {
    expiresIn: ENV_CONFIGS.accessTokenKeyExpiresIn
  });
}

/**
 * Generates a new refresh token based on user id.
 * 
 * @param user - The User record.
 * @returns refresh token.
 */
export function generateRefreshToken(userId: string | undefined): string {
  return jwt.sign({ userId: userId }, ENV_CONFIGS.refreshTokenKey, {
    expiresIn: ENV_CONFIGS.refreshTokenKeyExpiresIn
  });
}

/**
 * verifies the token.
 * 
 * @param password - Password of user.
 * @param user - The User record.
 * @returns - boolean value to identity success/failure.
 */
export async function verifyToken(password: string, user: Record<string, any>[]): Promise<boolean> {
  return await bcrypt.compare(password, user.at(0)?.password);
};
