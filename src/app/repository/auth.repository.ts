import config from "@/configs/config";
import { IDatabase } from "pg-promise";

export class AuthRepository {
  private db: IDatabase<any>;

  constructor(db: any) {
    this.db = db;
  }

  async getUserByEmail(email: string) {
    return await this.db.oneOrNone(
      `SELECT u.id FROM users u  WHERE encode(decrypt(u.email , $2, 'aes'), 'escape')::text = $1`,
      [email, config.SECRET]
    );
  }

  async createUser(fullName: string, email: string, hashedPassword: string) {
    return await this.db.tx(async (t: any) => {
      const user = await t.one(
        `INSERT INTO users ( full_name, email, is_active)
        VALUES ( encrypt($1, $3, 'aes'), encrypt($2, $3, 'aes'), TRUE)
        RETURNING id`,
        [fullName, email, config.SECRET]
      );

      await t.none(
        `INSERT INTO user_logins (user_id, provider_id, password) 
        VALUES ($1, (SELECT id FROM login_providers WHERE provider_name = 'password'), $2)`,
        [user.id, hashedPassword]
      );

      return user;
    });
  }

  async insertVerificationToken(
    userId: string,
    tokenId: string,
    hashedToken: string,
    expiresAt: Date
  ) {
    return await this.db.none(
      `INSERT INTO user_verifications (user_id,token_id, hashed_token, type, expires_at)
      VALUES ($1, $2, $3, 'email_verification', $4)`,
      [userId, tokenId, hashedToken, expiresAt]
    );
  }

  async getVerificationToken(tokenId: string) {
    return await this.db.oneOrNone(
      `SELECT * FROM user_verifications WHERE token_id = $1 AND type = 'email_verification'`,
      [tokenId]
    );
  }

  async verifyEmail(userId: string) {
    return await this.db.none(
      `UPDATE user_logins SET is_verified = TRUE WHERE user_id = $1`,
      [userId]
    );
  }

  async getUserDetail(userId: string) {
    return await this.db.oneOrNone(
      `SELECT
      encode(decrypt(u.email, $2, 'aes'), 'escape') as email,
      encode(decrypt(u.full_name, $2, 'aes'), 'escape') as full_name,
      u.is_active 
      FROM users u WHERE u.id = $1`,
      [userId, config.SECRET]
    );
  }

  async getUserLogin(userId: string) {
    return await this.db.oneOrNone(
      `SELECT
      ul.password,
      ul.is_verified
      FROM user_logins ul
      WHERE ul.user_id = $1 and ul.provider_id = 1;`,
      [userId]
    );
  }
}
