import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

import { Exception } from "../error/Exception";
import { ENV_CONFIGS } from '../config/envConfigs';
import { STATUS_CODES } from "../constants/statusCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export default async function validateAccessToken(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Exception(STATUS_CODES.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
    }

    const decoded = jwt.verify(token, ENV_CONFIGS.accessTokenKey);

    req.body.userId = decoded;

    next();
  } catch (err) {
    next(err);
  }
};
