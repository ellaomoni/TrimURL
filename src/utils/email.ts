import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  code: string
) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: email,
    subject: "Verify your LinkPulse account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verify your email</h2>
        <p>Use the code below to verify your LinkPulse account:</p>
        <h1 style="letter-spacing: 6px;">${code}</h1>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
};