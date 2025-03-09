import { ExtraInfoRequest } from "@/types/request";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const assignRequestId = (
  req: Request & ExtraInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  req.request_id = requestId as string;
  res.setHeader("X-Request-ID", requestId);

  next();
};
