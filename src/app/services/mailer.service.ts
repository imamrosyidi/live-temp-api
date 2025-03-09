import config from "@/configs/config";
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";

class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text?: string, html?: string) {
    const mailOptions: SendMailOptions = {
      from: config.SMTP_USER,
      to,
      subject,
      text,
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendVerificationEmail(email, token) {
    const subject = "Email Verification";
    const html = `Click <a href="${config.BASE_URL}/verify-email/${token}">here</a> to verify your email.`;

    await this.sendMail(email, subject, undefined, html);
  }
}

export { MailerService };
