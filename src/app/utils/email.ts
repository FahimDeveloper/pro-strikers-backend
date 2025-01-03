import nodemailer from 'nodemailer';
import config from '../config';
import { IBundleCreditPack } from '../modules/BundleCreditPack/bundleCreditPack.interface';
import moment from 'moment-timezone';

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
    from: `ProStrikers <${config.notify_email}>`,
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
                        <th style="text-align:center;>Sport</th>
                        <th style="text-align:center;">Time Slot</th>
                        <th style="text-align:center;">Lane</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${bookings.bookings
                        .map(
                          (booking: any) => `
                        <tr>
                          <td style="text-align:center;">${moment(booking.date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                          <td style="text-align:center; text-transform:capitalize;">${bookings.sport}</td>
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
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
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
                    <th style="text-align:center;">Sport</th>
                    <th style="text-align:center;">Time Slot</th>
                    <th style="text-align:center;">Lane</th>
                  </tr>
                </thead>
                <tbody>
                  ${bookings.bookings
                    .map(
                      (booking: any) => `
                      <tr>
                        <td style="text-align:center;">${moment(booking.date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                        <td style="text-align:center;text-transform:capitalize;">${bookings.sport}</td>
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

export const sendRentalBookingFailedNotifyEmail = async ({
  transactionId,
  amount,
  bookings,
}: {
  transactionId: string;
  amount: number;
  bookings: any;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Rental Facility Booking Failed - ProStrikers',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
            
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikes</h1>
            </div>

            <h2 style="color: #E74C3C;">Purchase Failure Notification - ProStrikers</h2>
            <p><strong>Customer:</strong> ${bookings.first_name} ${bookings.last_name}</p>
            <p><strong>Email:</strong> ${bookings.email}</p>
            <p><strong>Phone:</strong> ${bookings.phone}</p>

            <h3 style="color: #E74C3C;">Transaction Details</h3>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Attempted Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

            <h3 style="color: #E74C3C;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #E74C3C; color: white;">
                  <th style="text-align:center;">Date</th>
                  <th style="text-align:center;">Sport</th>
                  <th style="text-align:center;">Time Slot</th>
                  <th style="text-align:center;">Lane</th>
                </tr>
              </thead>
              <tbody>
                ${bookings.bookings
                  .map(
                    (booking: any) => `
                    <tr>
                      <td style="text-align:center;">${moment(booking.date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      <td style="text-align:center;text-transform:capitalize;">${bookings.sport}</td>
                      <td style="text-align:center;">${booking.time_slot}</td>
                      <td style="text-align:center;">${booking.lane}</td>
                    </tr>
                  `,
                  )
                  .join('')}
              </tbody>
            </table>

            <h3 style="color: #E74C3C;">Add-ons</h3>
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

            <hr style="border: 1px solid #ccc; margin: 20px 0;">

            <p style="color: #E74C3C;">The process failed due to an issue. Please verify the payment information from Payment managment system (Stripe dashboard) and contact with the user for further assistance.</p>
          </div>
        </body>
      </html>
    `,
  });
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
    from: `ProStrikers <${config.notify_email}>`,
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
                    <td style="text-align:center;">${moment(membership.issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                    <td style="text-align:center;">${moment(membership.expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
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
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
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
                      <td style="text-align:center;">${moment(membership.issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      <td style="text-align:center;">${moment(membership.expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
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

export const sendMembershipPurchasedFailedNotifyEmail = async ({
  email,
  amount,
  membership,
  transactionId,
}: {
  transactionId: string;
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
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Membership Purchase Failed - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>
  
                  <h2 style="color: #E74C3C;">Membership Purchase Failed</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following membership purchase attempt failed. Please review the details below:</p>
  
                  <h3 style="color: #E74C3C;">Membership Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #E74C3C; color: white;">
                        <th style="text-align:center;">Package Name</th>
                        <th style="text-align:center;">Plan</th>
                        <th style="text-align:center;">Attempt Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align:center;">${membership.package_name}</td>
                        <td style="text-align:center;">${membership.plan}</td>
                        <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  <h3 style="color: #E74C3C;">Payment Information</h3>
                  <p><strong>Attempted Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Transaction ID:</strong> ${transactionId || 'Not Available'}</p>
  
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <p style="color: #E74C3C;">The process failed due to an issue. Please verify the payment information from Payment managment system (Stripe dashboard) and contact with the user for further assistance.</p>
  
                  <h3 style="color: #E74C3C;">Contact Information</h3>
                  <p>Email: <a href="mailto:${email}">${email}</a></p>
  
                  <p>Thank you for using ProStrikers Admin Services.</p>
                </div>
              </body>
            </html>
          `,
  });
  return;
};

export const sendBundleCreditPurchaseFailedNotifyEmail = async ({
  transactionId,
  email,
  amount,
  bundle,
}: {
  transactionId: string;
  email: string;
  amount: number;
  bundle: IBundleCreditPack;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Bundle Credit Pack Purchase Failed - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>
  
                  <h2 style="color: #E74C3C;">Bundle Credit Pack Purchase Failed</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following bundle credit pack purchase attempt failed. Please review the details below:</p>
  
                  <h3 style="color: #E74C3C;">Bundle Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead>
                    <tr style="background-color: #E74C3C; color: white;">
                      <th style="text-align:center;">Bundle Name</th>
                      <th style="text-align:center;">Hours</th>
                      <th style="text-align:center;">Piching Machine</th>
                      <th style="text-align:center;">Attempt Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align:center;">${bundle.package}</td>
                      <td style="text-align:center;">${bundle.hours}</td>
                      <td style="text-align:center;">${bundle.piching_machine ? 'Yes' : 'No'}</td>
                      <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YYYY')}</td>
                    </tr>
                  </tbody>
                </table>
  
                  <h3 style="color: #E74C3C;">Payment Information</h3>
                  <p><strong>Attempted Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Transaction ID:</strong> ${transactionId || 'Not Available'}</p>
  
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <p style="color: #E74C3C;">The process failed due to an issue. Please verify the payment information from Payment managment system (Stripe dashboard) and contact with the user for further assistance.</p>
  
                  <h3 style="color: #E74C3C;">Contact Information</h3>
                  <p>Email: <a href="mailto:${email}">${email}</a></p>
  
                  <p>Thank you for using ProStrikers Admin Services.</p>
                </div>
              </body>
            </html>
          `,
  });
};

export const sendBundleCreditPackPurchasedConfirmationEmail = async ({
  email,
  amount,
  bundle,
}: {
  email: string;
  amount: number;
  bundle: IBundleCreditPack;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Bundle Credit Pack Purchase Confirmation',
    html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">

              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
              </div>

              <h2 style="color: #0ABAC3;">Bundle Credit Pack Purchase Confirmation</h2>
              <p>Dear Customer,</p>
              <p>Thank you for purchasing a bundle credit pack at ProStrikers! Below are your purchase details:</p>

              <h3 style="color: #0ABAC3;">Bundle Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Bundle Name</th>
                    <th style="text-align:center;">Hours</th>
                    <th style="text-align:center;">Piching Machine</th>
                    <th style="text-align:center;">Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align:center;">${bundle.package}</td>
                    <td style="text-align:center;">${bundle.hours}</td>
                    <td style="text-align:center;">${bundle.piching_machine ? 'Yes' : 'No'}</td>
                    <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YYYY')}</td>
                  </tr>
                </tbody>
              </table>

              <h3 style="color: #0ABAC3;">Payment Information</h3>
              <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

              <hr style="border: 1px solid #ccc; margin: 20px 0;">

              <p>If you have any questions about your purchase, please don't hesitate to contact us.</p>

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
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'New Bundle Credit Pack Purchased - ProStrikers',
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">

                <!-- Logo Section -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                </div>

                <h2 style="color: #0ABAC3;">New Bundle Credit Pack Purchased</h2>
                <p><strong>User Email:</strong> ${email}</p>
                <p>A new bundle credit pack has been purchased. Below are the details:</p>

                <h3 style="color: #0ABAC3;">Bundle Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Bundle Name</th>
                    <th style="text-align:center;">Hours</th>
                    <th style="text-align:center;">Piching Machine</th>
                    <th style="text-align:center;">Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align:center;">${bundle.package}</td>
                    <td style="text-align:center;">${bundle.hours}</td>
                    <td style="text-align:center;">${bundle.piching_machine ? 'Yes' : 'No'}</td>
                    <td style="text-align:center;">${moment().tz('').tz('America/Los_Angeles').format('ddd, MMM Do YYYY')}</td>
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
