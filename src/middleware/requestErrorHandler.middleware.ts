import { ZodError } from "zod";

import { Exception } from "../error/Exception";
import { STATUS_CODES } from "../constants/statusCodes";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export function requestErrorHandler(error: any, req: Request, res: Response, next: NextFunction): any {
  console.error(`There was error: ${error.message}`);
  if (!error) return next();

  switch (error) {
    case (error instanceof Exception):
      return res.status(error.statusCode).json({
        success: 'false',
        error: error.name,
        message: error.message
      });

    case (error instanceof ZodError):
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: 'false',
        error: error.name,
        message: 'Request Validation Error',
        details: error.flatten()
      });

    default:
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: 'false',
        error: error.name,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        details: error.flatten()
      });
  }
};
