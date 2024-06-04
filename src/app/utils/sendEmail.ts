import nodemailer from 'nodemailer';
import config from '../config';

type TProp = { email: string; link?: string; code?: number };

export const sendEmail = async ({ email, link, code }: TProp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
      user: config.node_mailer_mail,
      pass: config.node_mailer_mail_pass,
    },
  });

  if (link) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Password Reset Link',
      html: `Reset your password within 15 minutes <a href="${link}">${link}</a>`,
    });
  }

  if (code) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Reset Code',
      text: `Use this code ${code} to reset your password`,
    });
  }
  return;
};
