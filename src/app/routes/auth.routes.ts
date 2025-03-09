import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { attachRoutes } from "../utils/registerRoutes";
import { MailerService } from "../services/mailer.service";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import database from "@/configs/database";
import { AppRoute } from "@/types/route";

const router = Router();

const authRepository = new AuthRepository(database);
const mailerService = new MailerService();
const authService = new AuthService(authRepository, mailerService);
const authController = new AuthController(authService);

const routes: AppRoute[] = [
  {
    method: "post",
    path: "/login",
    action: authController.login,
  },
  {
    method: "post",
    path: "/refresh-token",
    action: authController.refreshToken,
  },
  {
    method: "post",
    path: "/register",
    action: authController.register,
  },
  {
    method: "get",
    path: "/verify-email/:token",
    action: authController.verifyEmail,
  },
  {
    method: "get",
    path: "/user-detail",
    action: authController.userDetail,
    auth: "private",
  },
];

attachRoutes(router, routes, "public");

export default router;
