import { ControllerAction } from "@/types/controller";
import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (
  validationRules?: ControllerAction["validate"]
) => {
  if (!validationRules) {
    // No validation needed
    return (req: Request, res: Response, next: NextFunction) => next();
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const key of Object.keys(validationRules) as (keyof Request)[]) {
      const { error } = Joi.object(validationRules[key]!).validate(req[key], {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((e) => e.message));
      }
    }

    if (errors.length) {
      return next(AppError.BadRequest("Validation Error", errors));
    }

    next();
  };
};
