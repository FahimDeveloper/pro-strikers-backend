import nodemailer from 'nodemailer';
import config from '../config';

type TProp = {
  email: string;
  emailVerifyLink?: string;
  link?: string;
  code?: number;
  password?: string;
  provider?: string;
};

export const sendEmail = async ({
  email,
  emailVerifyLink,
  link,
  code,
  password,
  provider,
}: TProp) => {
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

  if (emailVerifyLink) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Verify your account',
      html: `<div>
      Please verify your account as soon as possible <a href="${emailVerifyLink}">${emailVerifyLink}</a>
<br/><br/>
The link will be expired after 30 days
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
Phone: (916)-890-5834</p>
      </div>`,
    });
  }

  if (!provider && password) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Welcome to ProStrikers!',
      html: `<p>Dear User,
<br/>
Welcome to Pro Strikers! We are excited to have you join our family.
<br/>
Your account has been created successfully. Your temporary password is <span style="font-size: 22px; font-weight: 500;">${password}</span>
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

  if (provider && password) {
    await transporter.sendMail({
      from: config.node_mailer_mail,
      to: email,
      subject: 'Welcome to ProStrikers!',
      html: `<p>Dear User,
<br/>
Welcome to Pro Strikers! We are excited to have you join our family.
<br/>
Your account has been created successfully by ${provider} login. We are provide you a temporary password for login with your email and pass if you need. Password is <span style="font-size: 22px; font-weight: 500;">${password}</span>
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
