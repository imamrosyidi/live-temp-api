import bcrypt from "bcrypt";
import crypto from "crypto";
import { AuthRepository } from "../repository/auth.repository";
import { MailerService } from "./mailer.service";
import moment from "moment";
import { AppError } from "@/utils/appError";
import jwt from "jsonwebtoken";
import config from "@/configs/config";

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private mailerService: MailerService
  ) {}

  async register(full_name: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await this.authRepository.getUserByEmail(email);
    if (existingUser) {
      throw AppError.Conflict("User with this email already exists.");
    }

    const user = await this.authRepository.createUser(
      full_name,
      email,
      hashedPassword
    );

    const tokenId = crypto.randomBytes(16).toString("hex");
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 12);
    const tokenExipresAt = moment().add(1, "day").toDate();

    await this.authRepository.insertVerificationToken(
      user.id,
      tokenId,
      hashedToken,
      tokenExipresAt
    );

    await this.mailerService.sendVerificationEmail(
      email,
      `${tokenId}:${token}`
    );

    return {
      success: true,
      message: "Registration successful. Please verify your email.",
    };
  }

  async verifyEmail(token: string) {
    const [tokenId, rawToken] = token.split(":");
    if (!tokenId || !rawToken) {
      throw AppError.BadRequest("Invalid token format.");
    }

    const verificationToken = await this.authRepository.getVerificationToken(
      tokenId
    );
    if (!verificationToken) {
      throw AppError.BadRequest("Invalid or expired token.");
    }

    if (verificationToken.expires_at < new Date()) {
      throw AppError.Unauthorized("Token expired.");
    }

    const isTokenValid = await bcrypt.compare(
      rawToken,
      verificationToken.hashed_token
    );
    if (!isTokenValid) {
      throw AppError.BadRequest("Invalid token.");
    }

    await this.authRepository.verifyEmail(verificationToken.user_id);

    return { success: true, message: "Email verified." };
  }

  async login(email, password) {
    const user = await this.authRepository.getUserByEmail(email);
    if (!user) {
      throw AppError.Unauthorized("Invalid email or password");
    }

    const userDetail = await this.authRepository.getUserDetail(user.id);
    if (!userDetail.is_active) {
      throw AppError.Forbidden("Account is not active");
    }

    const userLogin = await this.authRepository.getUserLogin(user.id);
    if (!userLogin.is_verified) {
      throw AppError.Forbidden("Account is not verified");
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordValid) {
      throw AppError.Unauthorized("Invalid email or password");
    }

    const accessToken = jwt.sign(userDetail, config.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(userDetail, config.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const res = {
      ...userDetail,
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    return res;
  }

  async refreshToken(refreshToken) {
    try {
      const user = jwt.verify(
        refreshToken,
        config.JWT_REFRESH_SECRET
      ) as jwt.JwtPayload;

      delete user.iat;
      delete user.exp;

      const accessToken = jwt.sign(user, config.JWT_SECRET, {
        expiresIn: "15m",
      });
      const newRefreshToken = jwt.sign(user, config.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      });
      return { access_token: accessToken, refresh_token: newRefreshToken };
    } catch (error) {
      throw AppError.Unauthorized("Invalid refresh token.");
    }
  }
}
