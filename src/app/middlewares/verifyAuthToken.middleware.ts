import config from "@/configs/config";
import { ExtraInfoRequest } from "@/types/request";
import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAuthToken = (
  req: Request & ExtraInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw AppError.Unauthorized("Authorization token is required");
    }

    const tokenParts = authorization.split(" ");
    if (tokenParts.length !== 2) {
      throw AppError.Unauthorized("Invalid authorization token");
    }

    if (tokenParts[0] !== "Bearer") {
      throw AppError.Unauthorized("Invalid authorization token");
    }

    const token = tokenParts[1];
    try {
      const jwtPayload = jwt.verify(
        token,
        config.JWT_SECRET
      ) as ExtraInfoRequest["user"];
      req.user = jwtPayload;
      next();
    } catch (err) {
      throw AppError.Unauthorized("Invalid authorization");
    }
  } catch (err) {
    next(err);
  }
};
