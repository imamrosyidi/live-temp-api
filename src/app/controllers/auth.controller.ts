import Joi from "joi";
import { AuthService } from "../services/auth.service";
import { ControllerAction } from "@/types/controller";
export class AuthController {
  constructor(private authService: AuthService) {}

  register: ControllerAction = {
    handler: async (req) => {
      const { full_name, email, password } = req.body;
      const response = await this.authService.register(
        full_name,
        email,
        password
      );
      return { statusCode: 201, ...response };
    },
    validate: {
      body: {
        full_name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      },
    },
  };

  verifyEmail: ControllerAction = {
    handler: async (req, res) => {
      const { token } = req.params;
      const response = await this.authService.verifyEmail(token);
      return response;
    },
    validate: {
      params: {
        token: Joi.string().required(),
      },
    },
  };

  login: ControllerAction = {
    handler: async (req, res) => {
      const { email, password } = req.body;
      const response = await this.authService.login(email, password);
      return response;
    },
    validate: {
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
  };

  refreshToken: ControllerAction = {
    handler: async (req, res) => {
      const { refresh_token } = req.body;
      const response = await this.authService.refreshToken(refresh_token);
      return response;
    },
    validate: {
      body: {
        refresh_token: Joi.string().required(),
      },
    },
  };

  userDetail: ControllerAction = {
    handler: async (req) => {
      console.log("🚀 ~ AuthController ~ handler: ~ req:", req.user);
      return { data: req.user };
    },
  };
}
