import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ENV_CONFIGS } from "../../config/envConfigs";

/**
 * 
 * @param user 
 * @returns 
 */
export function generateAccessToken(user: Record<string, any>[]): string {
  return jwt.sign({ userId: user.at(0)?.id }, ENV_CONFIGS.accessTokenKey, {
    expiresIn: ENV_CONFIGS.accessTokenKeyExpiresIn
  });
}

/**
 * 
 * @param user 
 * @returns 
 */
export function generateRefreshToken(user: Record<string, any>[]): string {
  return jwt.sign({ userId: user.at(0)?.id }, ENV_CONFIGS.refreshTokenKey, {
    expiresIn: ENV_CONFIGS.refreshTokenKeyExpiresIn
  });
}

export async function verifyToken(password: string, user: Record<string, any>[]): Promise<boolean> {
  return await bcrypt.compare(password, user.at(0)?.password);
};
