import { Request } from "express";

export function getTodoReqParams(req: Request) {
  const page = parseInt(req.query.page as string, 10) ?? 1;
  const limit = parseInt(req.query.limit as string, 10) ?? 3;
  const sortBy: string = req.query.sort as string ?? 'created_at';
  const lastCursor: string = req.query.lastCursor as string;

  return { page, limit, sortBy, lastCursor };
}
