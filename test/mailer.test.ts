import { MailerService } from "./../src/app/services/mailer.service";

describe("Miler service test", () => {
  xit("should send message to email", async () => {
    const mailerService = new MailerService();
    await mailerService.sendMail(
      "nistyrosidi@gmail.com",
      "Email verification",
      undefined,
      `
        <h1>Verify your email</h1>
        <p>Click <a href="http://localhost:3000/verify-email/123">here</a> to verify your email.</p>
        `
    );
  });
});
