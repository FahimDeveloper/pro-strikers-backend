import nodemailer from 'nodemailer';
import config from '../config';
import moment from 'moment';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: config.node_mailer_mail,
    pass: config.node_mailer_mail_pass,
  },
});

export const sendRentalBookingConfirmationEmail = async ({
  email,
  bookings,
  amount,
}: {
  email: string;
  bookings: any;
  amount: number;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'ProStrikers - Booking Confirmation',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
                  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikes</h1/>
                  </div>
        
                  <h2 style="color: #0ABAC3;">Booking Confirmation - ProStrikers</h2>
                  <p>Dear ${bookings.first_name} ${bookings.last_name},</p>
                  <p>We are pleased to confirm your booking at ProStrikers! Below are your booking details:</p>
                  
                  <h3 style="color: #0ABAC3;">Booking Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #0ABAC3; color: white;">
                        <th style="text-align:center;">Date</th>
                        <th style="text-align:center;">Time Slot</th>
                        <th style="text-align:center;">Lane</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${bookings.bookings
                        .map(
                          (booking: any) => `
                        <tr>
                          <td style="text-align:center;">${moment(booking.date).format('ddd, MMM Do YY')}</td>
                          <td style="text-align:center;">${booking.time_slot}</td>
                          <td style="text-align:center;">${booking.lane}</td>
                        </tr>
                      `,
                        )
                        .join('')}
                    </tbody>
                  </table>
        
                  <h3 style="color: #0ABAC3; margin-top: 20px;">Add-ons</h3>
                  ${
                    bookings.addons.length > 0
                      ? `
                    <ul>
                      ${bookings.addons
                        .map(
                          (addon: any) => `
                        <li>
                          <strong>${addon.name}</strong> - ${addon.hours === 0.5 ? '30 minutes' : `${addon.hours} hour(s)`}
                          <br>
                          <img src="${addon.image}" alt="${addon.name}" style="max-width: 100px; margin-top: 5px;">
                        </li>
                      `,
                        )
                        .join('')}
                    </ul>
                  `
                      : '<p>No add-ons were selected for this booking.</p>'
                  }
        
                  <h3 style="color: #0ABAC3;">Payment Information</h3>
                  <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
        
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
        
                  <p>If you have any questions or need to make changes, please don't hesitate to contact us.</p>
                  
                  <h3 style="color: #0ABAC3;">Contact Information</h3>
                  <p>Email: <a href="mailto:admin@prostrikers.com">admin@prostrikers.com</a></p>
                  <p>Phone: (916)-890-5834</p>
                  <p>Address: 2230 16th St, Sacramento, CA 95818, United States</p>
        
                  <p>Thank you for choosing ProStrikers! We look forward to your visit.</p>
                </div>
              </body>
            </html>
          `,
  });
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: 'admin@prostrikers.com',
    subject: 'New Booking Alert - ProStrikers',
    html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikes</h1>
              </div>
  
              <h2 style="color: #0ABAC3;">New Booking Notification - ProStrikers</h2>
              <p><strong>Customer:</strong> ${bookings.first_name} ${bookings.last_name}</p>
              <p><strong>Email:</strong> ${bookings.email}</p>
              <p><strong>Phone:</strong> ${bookings.phone}</p>
  
              <h3 style="color: #0ABAC3;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Date</th>
                    <th style="text-align:center;">Time Slot</th>
                    <th style="text-align:center;">Lane</th>
                  </tr>
                </thead>
                <tbody>
                  ${bookings.bookings
                    .map(
                      (booking: any) => `
                      <tr>
                        <td style="text-align:center;">${moment(booking.date).format('ddd, MMM Do YY')}</td>
                        <td style="text-align:center;">${booking.time_slot}</td>
                        <td style="text-align:center;">${booking.lane}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>
              </table>
  
              <h3 style="color: #0ABAC3; margin-top: 20px;">Add-ons</h3>
              ${
                bookings.addons.length > 0
                  ? `
                  <ul>
                    ${bookings.addons
                      .map(
                        (addon: any) => `
                        <li>
                          <strong>${addon.name}</strong> - ${addon.hours === 0.5 ? '30 minutes' : `${addon.hours} hours`}
                          <br>
                          <img src="${addon.image}" alt="${addon.name}" style="max-width: 100px; margin-top: 5px;">
                        </li>
                      `,
                      )
                      .join('')}
                  </ul>
                `
                  : '<p>No add-ons selected.</p>'
              }
  
              <h3 style="color: #0ABAC3;">Payment Information</h3>
              <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
  
              <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
              <p>If you have any questions or need assistance with this booking, please reach out to the team.</p>
            </div>
          </body>
        </html>
      `,
  });
  return;
};

export const sendMembershipPurchasedConfirmationEmail = async ({
  email,
  amount,
  membership,
}: {
  email: string;
  amount: number;
  membership: {
    package_name: string;
    plan: string;
    status: boolean;
    membership: boolean;
    issue_date: string;
    expiry_date: string;
  };
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'ProStrikers - Membership Purchase Confirmation',
    html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
              </div>
  
              <h2 style="color: #0ABAC3;">Membership Purchase Confirmation</h2>
              <p>Dear Customer,</p>
              <p>Thank you for purchasing a membership at ProStrikers! Below are your membership details:</p>
              
              <h3 style="color: #0ABAC3;">Membership Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Package Name</th>
                    <th style="text-align:center;">Plan</th>
                    <th style="text-align:center;">Issue Date</th>
                    <th style="text-align:center;">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align:center;">${membership.package_name}</td>
                    <td style="text-align:center;">${membership.plan}</td>
                    <td style="text-align:center;">${moment(membership.issue_date).format('ddd, MMM Do YY')}</td>
                    <td style="text-align:center;">${moment(membership.expiry_date).format('ddd, MMM Do YY')}</td>
                  </tr>
                </tbody>
              </table>
  
              <h3 style="color: #0ABAC3;">Payment Information</h3>
              <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
  
              <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
              <p>If you have any questions about your membership, please don't hesitate to contact us.</p>
              
              <h3 style="color: #0ABAC3;">Contact Information</h3>
              <p>Email: <a href="mailto:admin@prostrikers.com">admin@prostrikers.com</a></p>
              <p>Phone: (916)-890-5834</p>
              <p>Address: 2230 16th St, Sacramento, CA 95818, United States</p>
  
              <p>Thank you for choosing ProStrikers! We look forward to serving you.</p>
            </div>
          </body>
        </html>
      `,
  });
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: 'admin@prostrikers.com',
    subject: 'New Membership Purchased - ProStrikers',
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
                
                <!-- Logo Section -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                </div>
    
                <h2 style="color: #0ABAC3;">New Membership Purchased</h2>
                <p><strong>User Email:</strong> ${email}</p>
                <p>A new membership has been purchased. Below are the details:</p>
                
                <h3 style="color: #0ABAC3;">Membership Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead>
                    <tr style="background-color: #0ABAC3; color: white;">
                      <th style="text-align:center;">Package Name</th>
                      <th style="text-align:center;">Plan</th>
                      <th style="text-align:center;">Issue Date</th>
                      <th style="text-align:center;">Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align:center;">${membership.package_name}</td>
                      <td style="text-align:center;">${membership.plan}</td>
                      <td style="text-align:center;">${moment(membership.issue_date).format('ddd, MMM Do YY')}</td>
                      <td style="text-align:center;">${moment(membership.expiry_date).format('ddd, MMM Do YY')}</td>
                    </tr>
                  </tbody>
                </table>
    
                <h3 style="color: #0ABAC3;">Payment Information</h3>
                <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
    
                <hr style="border: 1px solid #ccc; margin: 20px 0;">
    
                <p>Please verify this purchase in the system if necessary.</p>
                
                <h3 style="color: #0ABAC3;">Contact Information</h3>
                <p>Email: <a href="mailto:${email}">${email}</a></p>
    
                <p>Thank you for using ProStrikers Admin Services.</p>
              </div>
            </body>
          </html>
        `,
  });
  return;
};

export const sendBundleCreditPackPurchasedConfirmationEmail = async ({
  email,
  amount,
  membership,
}: {
  email: string;
  amount: number;
  membership: {
    package_name: string;
    plan: string;
    status: boolean;
    membership: boolean;
    issue_date: string;
    expiry_date: string;
  };
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'ProStrikers - Membership Purchase Confirmation',
    html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
              </div>
  
              <h2 style="color: #0ABAC3;">Membership Purchase Confirmation</h2>
              <p>Dear Customer,</p>
              <p>Thank you for purchasing a membership at ProStrikers! Below are your membership details:</p>
              
              <h3 style="color: #0ABAC3;">Membership Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Package Name</th>
                    <th style="text-align:center;">Plan</th>
                    <th style="text-align:center;">Issue Date</th>
                    <th style="text-align:center;">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align:center;">${membership.package_name}</td>
                    <td style="text-align:center;">${membership.plan}</td>
                    <td style="text-align:center;">${moment(membership.issue_date).format('ddd, MMM Do YY')}</td>
                    <td style="text-align:center;">${moment(membership.expiry_date).format('ddd, MMM Do YY')}</td>
                  </tr>
                </tbody>
              </table>
  
              <h3 style="color: #0ABAC3;">Payment Information</h3>
              <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
  
              <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
              <p>If you have any questions about your membership, please don't hesitate to contact us.</p>
              
              <h3 style="color: #0ABAC3;">Contact Information</h3>
              <p>Email: <a href="mailto:admin@prostrikers.com">admin@prostrikers.com</a></p>
              <p>Phone: (916)-890-5834</p>
              <p>Address: 2230 16th St, Sacramento, CA 95818, United States</p>
  
              <p>Thank you for choosing ProStrikers! We look forward to serving you.</p>
            </div>
          </body>
        </html>
      `,
  });
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: 'admin@prostrikers.com',
    subject: 'New Membership Purchased - ProStrikers',
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
                
                <!-- Logo Section -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                </div>
    
                <h2 style="color: #0ABAC3;">New Membership Purchased</h2>
                <p><strong>User Email:</strong> ${email}</p>
                <p>A new membership has been purchased. Below are the details:</p>
                
                <h3 style="color: #0ABAC3;">Membership Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead>
                    <tr style="background-color: #0ABAC3; color: white;">
                      <th style="text-align:center;">Package Name</th>
                      <th style="text-align:center;">Plan</th>
                      <th style="text-align:center;">Issue Date</th>
                      <th style="text-align:center;">Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align:center;">${membership.package_name}</td>
                      <td style="text-align:center;">${membership.plan}</td>
                      <td style="text-align:center;">${moment(membership.issue_date).format('ddd, MMM Do YY')}</td>
                      <td style="text-align:center;">${moment(membership.expiry_date).format('ddd, MMM Do YY')}</td>
                    </tr>
                  </tbody>
                </table>
    
                <h3 style="color: #0ABAC3;">Payment Information</h3>
                <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
    
                <hr style="border: 1px solid #ccc; margin: 20px 0;">
    
                <p>Please verify this purchase in the system if necessary.</p>
                
                <h3 style="color: #0ABAC3;">Contact Information</h3>
                <p>Email: <a href="mailto:${email}">${email}</a></p>
    
                <p>Thank you for using ProStrikers Admin Services.</p>
              </div>
            </body>
          </html>
        `,
  });
  return;
};

export const sendResetPasswordLinkEmail = async ({
  email,
  link,
}: {
  email: string;
  link: string;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'Password Reset Link',
    html: `Reset your password within 15 minutes <a href="${link}">${link}</a>`,
  });
  return;
};

export const sendResetPasswordVerifyCodeEmail = async ({
  email,
  code,
}: {
  email: string;
  code: number;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'Reset Code',
    html: `<p>Use this code <span style="font-size:18px; font-weight:500">${code}</span> to reset your password</p>`,
  });
  return;
};

export const sendVerifyEmail = async ({
  email,
  link,
}: {
  email: string;
  link: string;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'Verify your account',
    html: `<div>
    Please verify your account as soon as possible <a href="${link}">${link}</a>
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
  return;
};

export const sendTeamMemberAccountConfirmationEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
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
  return;
};

export const sendClientAccountConfirmationEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
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
  return;
};

export const sendSocialLoginConfirmationEmail = async ({
  email,
  provider,
  password,
}: {
  email: string;
  provider: string;
  password: string;
}) => {
  await transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
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
  return;
};
