import { Request, Response, NextFunction } from "express";
import { ControllerAction } from "@/types/controller";
import { ExtraInfoRequest } from "@/types/request";

export const handleRequest =
  (handler: ControllerAction["handler"]) =>
  async (
    req: Request & ExtraInfoRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await handler(req, res, next);

      // 🔹 Prevent multiple responses
      if (res.headersSent) return;

      // 🔹 No content response (204 No Content)
      if (result === null || result === undefined) {
        res.status(204).end();
        return;
      }

      // 🔹 Handle Redirects (explicit structure check)
      if (typeof result === "object" && "redirect" in result) {
        return res.redirect(result.statusCode || 302, result.redirect);
      }

      // 🔹 Construct final response with request_id
      const response = {
        ...result,
        request_id: req.request_id as string,
      };

      res.status(result?.statusCode || 200).json(response);
    } catch (err) {
      next(err);
    }
  };
