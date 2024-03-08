import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const schemaValidation = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!schemaValidation.success) return res.status(400).json(schemaValidation.error);

  return next();
};
