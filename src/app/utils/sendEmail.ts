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
      html: `<p>Use this code <span style="font-size:18px; font-weight:500">${code}</span> to reset your password</p>`,
    });
  }

  if (password) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Welcome to ProStrikers!',
      html: `<p>Dear User,
<br/>
Welcome to Pro Strikers! We are excited to have you join our family.
<br/>
Your account has been successfully created. Your temporary password is <span style="font-size: 22px; font-weight: 500;">${password}</span>
<br/>
To ensure the security of your account, we recommend that you change your password immediately.
<br/>
Please follow the steps below to update your password:
<br/>
<br/>
**Change Your Password:**
<br/>
we highly suggest changing your password to something unique and secure. To change your password, follow these steps:
<br/>
- Log in to your account.
<br/>
- Navigate to the "Account" page.
<br/>
- Click on "Change Password" and follow the instructions.
<br/>
<br/>
For your security, please ensure that your new password is strong and not easily guessable. A good password includes a combination of upper and lower case letters, numbers, and special characters.
<br/><br/>
If you did not create this account, please ignore this email or contact our support team immediately at admin@prostrikers.com.
<br/><br/>
Thank you for joining us, and we look forward to providing you with a great experience.
<br/><br/>
Best regards,
<br/><br/>
Prostrikers Team
<br/>
2230 16th St, Sacramento, CA 95818, United States.
<br/>
Email: admin@prostrikers.com
<br/>
Phone: (916)-890-5834</p>`,
    });
  }
  return;
};
