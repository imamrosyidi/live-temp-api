// app/types/controller.interface.ts
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ControllerAction {
  handler: (
    req: Request & ExtraInfoRequest,
    res: Response,
    next: NextFunction
  ) => Promise<any>;
  validate?: {
    body?: Record<string, Joi.Schema>;
    query?: Record<string, Joi.Schema>;
    params?: Record<string, Joi.Schema>;
  };
}

interface Controller {
  [key: string]: ControllerAction;
}
