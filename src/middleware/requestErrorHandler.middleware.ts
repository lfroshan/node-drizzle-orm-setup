import { ZodError } from "zod";

import { Exception } from "../error/Exception";
import { ENV_CONFIGS } from "../config/envConfigs";
import { STATUS_CODES } from "../constants/statusCodes";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export default function requestErrorHandler(error: any, req: Request, res: Response, next: NextFunction): any {
  if (!error) return next();

  if (error instanceof Exception) {
    return res.status(error.statusCode).json({
      success: 'false',
      error: error.name,
      message: error.message
    });
  }

  if (error instanceof ZodError) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: 'false',
      error: error.name,
      name: 'Request Validation Error',
      details: error.flatten()
    });
  }

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: 'false',
    error: error.name,
    name: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    message: ENV_CONFIGS.environment === 'development' ? JSON.stringify(error.stack) : "Something Went Wrong"
  });
}

