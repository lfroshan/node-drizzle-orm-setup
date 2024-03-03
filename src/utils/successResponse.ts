import { Response } from "express";

export function Return(res: Response, statusCode: number, data: Record<string, any>) {
  res.status(statusCode).json({
    success: true,
    data: data
  });
};
