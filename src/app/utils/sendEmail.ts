import nodemailer from 'nodemailer';
import config from '../config';

type TProp = { email: string; link?: string; code?: number; password?: string };

export const sendEmail = async ({ email, link, code, password }: TProp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
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

  if (password) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Welcome to ProStrikers!',
      text: `Dear User,

Welcome to Pro Strikers! We are excited to have you join our family.
Your account has been successfully created. Your temporary password is ${password}. To ensure the security of your account, we recommend that you change your password immediately.
Please follow the steps below to update your password:

**Change Your Password:**
we highly suggest changing your password to something unique and secure. To change your password, follow these steps:
- Log in to your account.
- Navigate to the "Account Settings" page.
- Click on "Change Password" and follow the instructions.

For your security, please ensure that your new password is strong and not easily guessable. A good password includes a combination of upper and lower case letters, numbers, and special characters.

If you did not create this account, please ignore this email or contact our support team immediately at admin@prostrikers.com.

Thank you for joining us, and we look forward to providing you with a great experience.

Best regards,

Prostrikers Team
2230 16th St, Sacramento, CA 95818, United States.
Email: admin@prostrikers.com
Phone: (916)-890-5834
`,
    });
  }
  return;
};
