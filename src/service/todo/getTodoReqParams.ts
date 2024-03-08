import { Request } from "express";
import { ENV_CONFIGS } from "../../config/envConfigs";

export function getTodoReqParams(req: Request) {
  const page = parseInt(req.query.page as string, 10) ?? ENV_CONFIGS.paginationDefaultPage;
  const limit = parseInt(req.query.limit as string, 10) ?? ENV_CONFIGS.paginationDefaultSize;
  const sortBy: string = req.query.sort as string ?? 'created_at';
  const lastCursor: string = req.query.lastCursor as string;

  return { page, limit, sortBy, lastCursor };
}
