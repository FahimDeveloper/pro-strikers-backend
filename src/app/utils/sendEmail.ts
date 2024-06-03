import nodemailer from 'nodemailer';

type TProp = { email: string; link?: string; code?: number };

export const sendEmail = async ({ email, link, code }: TProp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
      user: 'admin@prostrikers.com',
      pass: 'ylau ahyu jwgw hdky',
    },
  });

  if (link) {
    await transporter.sendMail({
      from: 'admin@prostrikers.com',
      to: email,
      subject: 'Password Reset Link',
      html: `Reset your password within 15 minutes <a href="${link}">${link}</a>`,
    });
  }

  if (code) {
    await transporter.sendMail({
      from: 'admin@prostrikers.com',
      to: email,
      subject: 'Reset Code',
      text: `Use this code ${code} to reset your password`,
    });
  }
};
