import { ExtraInfoRequest } from "@/types/request";
import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";

export const handleApiError = (
  err: Error | AppError,
  req: Request & ExtraInfoRequest,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
      request_id: req.request_id,
    });
  } else {
    res
      .status(500)
      .json({ message: "Internal Server Error", request_id: req.request_id });
  }
};
