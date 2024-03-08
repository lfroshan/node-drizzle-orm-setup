import { Request, Response, NextFunction } from 'express';

import { Exception } from '../error/Exception';
import { STATUS_CODES } from '../constants/statusCodes';
import { allowedSortFields } from '../constants/allowedSortFields';
import { CUSTOM_ERROR_MESSAGES } from '../constants/errorMessages';
import { getTodoReqParams } from '../service/todo/getTodoReqParams';

/**
 * Validates the Params in request for get request.
 * Note: Use only for offset pagination.
 */
export async function validateGetParamsForOffset(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { sortBy } = getTodoReqParams(req);

    if (!allowedSortFields.includes(sortBy)) throw new Exception(STATUS_CODES.BAD_REQUEST, CUSTOM_ERROR_MESSAGES.SORT_KEY_NOT_ALLOWED);
  } catch (err) {
    next(err);
  }

  next();
}

/**
 * Validates the Params in request for get request.
 * Note: Use only for cursor pagination.
 */
export async function validateGetParamsForCursor(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { sortBy } = getTodoReqParams(req);

    if (!allowedSortFields.includes(sortBy)) throw new Exception(STATUS_CODES.BAD_REQUEST, CUSTOM_ERROR_MESSAGES.SORT_KEY_NOT_ALLOWED);
  } catch (err) {
    next(err);
  }

  next();
}
