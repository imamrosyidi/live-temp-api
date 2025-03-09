import { Request, Response, NextFunction } from "express";

interface AppRoute {
  method: "get" | "post" | "put" | "delete";
  path: string;
  action: ControllerAction;
  auth?: "public" | "private"; // Inline AuthMode
  middlewares?: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
