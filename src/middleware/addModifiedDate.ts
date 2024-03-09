import { Request, Response, NextFunction } from "express";

export const addModifiedDateToRequestData = (req: Request, res: Response, next: NextFunction) => {
  // This will be saved in every request record.
  if (req.method === "PATCH") {
    req.body.updatedAt = new Date();
  }

  next();
};
