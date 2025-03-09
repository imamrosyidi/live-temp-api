import { Router } from "express";
import { handleRequest } from "../middlewares/handleRequest.middleware";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { AppRoute } from "@/types/route";

export const attachRoutes = (
  router: Router,
  routes: AppRoute[],
  globalAuth: "public" | "private" = "public"
) => {
  routes.forEach(({ method, path, action, auth, middlewares = [] }) => {
    const requiresAuth = auth ? auth === "private" : globalAuth === "private";

    router[method](
      path,
      ...middlewares,
      ...(requiresAuth ? [verifyAuthToken] : []),
      validateRequest(action.validate),
      handleRequest(action.handler)
    );
  });

  return router;
};
