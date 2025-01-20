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

export const sendFeedbackEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'New Feedback Notification',
    html: `<html>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
      
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 1.875rem; line-height: 2.25rem;">ProStrikers</h1>
      </div>

      <h2 style="color: #0ABAC3;">New Contact Form Submission</h2>
      <p>Dear Admin,</p>
      <p>You have received a new message from a user via the contact form. Below are the details:</p>
      
      <!-- Contact Details Section -->
      <div style="margin-top: 20px;">
        <p><strong style="color: #0ABAC3;">Name:</strong> ${name}</p>
        <p><strong style="color: #0ABAC3;">Email:</strong> ${email}</p>
        <p><strong style="color: #0ABAC3;">Message:</strong></p>
        <p>${message}</p>
      </div>

      <!-- Footer Section -->
      <hr style="border: 1px solid #ccc; margin: 20px 0;">
      <p>If you need to respond, you can reply to the user's email directly or take appropriate action.</p>
    </div>
  </body>
</html>
`,
  });
  return;
};

export const sendRentalBookingConfirmationEmail = async ({
  user,
  email,
  bookings,
  amount,
}: {
  user: any;
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
             <head>
              <style>
              .booking-list {
                display: none;
              }
              @media only screen and (max-width: 640px) {
                .booking-table {
                  display: none;
                }
                .booking-list {
                  display: block;
                }
                .booking-list-part{
                  border-width: 1px;
                  border-color:#0ABAC3;
                  border-style: solid;
                  border-radius:5px;
                  margin-bottom:10px;
                  margin-top:10px;
                  padding-left:10px;
                  padding-right:10px;
                }
              }
              </style>
            </head>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
                  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1/>
                  </div>
        
                  <h2 style="color: #0ABAC3;">Booking Confirmation - ProStrikers</h2>
                  <p>Dear ${user.first_name} ${user.last_name},</p>
                  <p>We are pleased to confirm your booking at ProStrikers! Below are your booking details:</p>
                  
                  <h3 style="color: #0ABAC3;">Booking Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;" class="booking-table">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Date</th>
                    <th style="text-align:center;">Sport</th>
                    <th style="text-align:center;">Time Slot</th>
                    <th style="text-align:center;">Area</th>
                  </tr>
                </thead>
                <tbody>
                  ${bookings.bookings
                    .map(
                      (booking: any) => `
                      <tr>
                        <td style="text-align:center;">${moment(booking.date).format('dddd, MMM Do YYYY')}</td>
                        <td style="text-align:center;text-transform:capitalize;">${bookings.sport}</td>
                        <td style="text-align:center;">${booking.time_slot}</td>
                        <td style="text-align:center;">${booking.lane}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>
              </table>
              <div class="booking-list">
               ${bookings.bookings
                 .map(
                   (booking: any) => `
                      <div class="booking-list-part">
                        <p> <span style="font-weight:600;">Booking Date</span> - ${moment(booking.date).format('dddd, MMM Do YYYY')}</p>
                        <p> <span style="font-weight:600;">Booking Sport</span> - ${bookings.sport}</p>
                        <p> <span style="font-weight:600;">Booking Time</span> - ${booking.time_slot}</p>
                        <p> <span style="font-weight:600;">Booking Area</span> - ${booking.lane}</p>
                      </div>
                    `,
                 )
                 .join('')}
              </div>
        
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
        <head>
          <style>
              .booking-list {
                display: none;
              }
              @media only screen and (max-width: 640px) {
                .booking-table {
                  display: none;
                }
                .booking-list {
                  display: block;
                }
                .booking-list-part{
                  border-width: 1px;
                  border-color:#0ABAC3;
                  border-style: solid;
                  border-radius:5px;
                  margin-bottom:10px;
                  margin-top:10px;
                  padding-left:10px;
                  padding-right:10px;
                }
              }
            </style>
        </head>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
              </div>
  
              <h2 style="color: #0ABAC3;">New Booking Notification - ProStrikers</h2>
              <p><strong>Customer:</strong> ${user.first_name} ${user.last_name}</p>
              <p><strong>Email:</strong> ${bookings.email}</p>
  
              <h3 style="color: #0ABAC3;">Booking Details</h3>
              <table class="booking-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Date</th>
                    <th style="text-align:center;">Sport</th>
                    <th style="text-align:center;">Time Slot</th>
                    <th style="text-align:center;">Area</th>
                  </tr>
                </thead>
                <tbody>
                  ${bookings.bookings
                    .map(
                      (booking: any) => `
                      <tr>
                        <td style="text-align:center;">${moment(booking.date).format('dddd, MMM Do YYYY')}</td>
                        <td style="text-align:center;text-transform:capitalize;">${bookings.sport}</td>
                        <td style="text-align:center;">${booking.time_slot}</td>
                        <td style="text-align:center;">${booking.lane}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>
              </table>
              <div class="booking-list">
               ${bookings.bookings
                 .map(
                   (booking: any) => `
                      <div class="booking-list-part">
                        <p> <span style="font-weight:600;">Booking Date</span> - ${moment(booking.date).format('dddd, MMM Do YYYY')}</p>
                        <p> <span style="font-weight:600;">Booking Sport</span> - ${bookings.sport}</p>
                        <p> <span style="font-weight:600;">Booking Time</span> - ${booking.time_slot}</p>
                        <p> <span style="font-weight:600;">Booking Area</span> - ${booking.lane}</p>
                      </div>
                    `,
                 )
                 .join('')}
              </div>
  
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

export const sendShopPurchaseConfirmationEmail = async ({
  email,
  data,
  amount,
  transactionId,
}: {
  email: string;
  data: any[];
  amount: number;
  transactionId: string;
}) => {
  // Email to the user
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Purchase Confirmation',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
                  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>
        
                  <h2 style="color: #0ABAC3;">Purchase Confirmation - ProStrikers</h2>
                  <p>Dear Customer,</p>
                  <p>Thank you for your purchase at ProStrikers! Below are your order details:</p>
                  
                  <h3 style="color: #0ABAC3;">Order Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #0ABAC3; color: white;">
                        <th style="text-align:center;">Product Info</th>
                        <th style="text-align:center;">Quantity</th>
                        <th style="text-align:center;">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${data
                        .map(
                          product => `
                        <tr>
                          <td style="text-align:center;">${product.product_name}</td>
                          <td style="text-align:center;">${product.quantity}</td>
                          <td style="text-align:center;">$${product.total_price}</td>
                        </tr>
                      `,
                        )
                        .join('')}
                    </tbody>
                  </table>
        
                  <h3 style="color: #0ABAC3; margin-top: 20px;">Transaction Details</h3>
                  <p><strong>Transaction ID:</strong> ${transactionId}</p>
                  <p><strong>Total Amount:</strong> $${amount}</p>
        
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
        
                  <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
                  
                  <h3 style="color: #0ABAC3;">Contact Information</h3>
                  <p>Email: <a href="mailto:admin@prostrikers.com">admin@prostrikers.com</a></p>
                  <p>Phone: (916)-890-5834</p>
                  <p>Address: 2230 16th St, Sacramento, CA 95818, United States</p>
        
                  <p>Thank you for choosing ProStrikers! We hope to serve you again soon.</p>
                </div>
              </body>
            </html>
          `,
  });

  // Email to the admin
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'New Purchase Alert - ProStrikers',
    html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
              </div>
  
              <h2 style="color: #0ABAC3;">New Purchase Notification - ProStrikers</h2>
              <p><strong>Customer Email:</strong> ${email}</p>
              <h3 style="color: #0ABAC3;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #0ABAC3; color: white;">
                    <th style="text-align:center;">Product Info</th>
                    <th style="text-align:center;">Quantity</th>
                    <th style="text-align:center;">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${data
                    .map(
                      product => `
                      <tr>
                        <td style="text-align:center;">${product.product_name}</td>
                        <td style="text-align:center;">${product.quantity}</td>
                        <td style="text-align:center;">$${product.total_price}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>
              </table>
  
              <h3 style="color: #0ABAC3; margin-top: 20px;">Transaction Details</h3>
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
              <p><strong>Total Amount:</strong> $${amount}</p>
  
              <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
              <p>Please verify the order and take the necessary steps to fulfill it.</p>
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
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
            </div>

            <h2 style="color: #E74C3C;">Purchase Failure Notification - ProStrikers</h2>
            <p><strong>Customer:</strong> ${bookings.email}</p>

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
                  <th style="text-align:center;">Area</th>
                </tr>
              </thead>
              <tbody>
                ${bookings.bookings
                  .map(
                    (booking: any) => `
                    <tr>
                      <td style="text-align:center;">${moment(booking.date).format('ddd, MMM Do YY')}</td>
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

export const sendShopPurchaseFailedNotifyEmail = async ({
  email,
  transactionId,
  amount,
  data,
}: {
  email: string;
  transactionId: string;
  amount: number;
  data: any[];
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Shop Purchase Failed - ProStrikers',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
            
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
            </div>

            <h2 style="color: #E74C3C;">Shop Purchase Failure Notification - ProStrikers</h2>
            <p><strong>Customer Email:</strong> ${email}</p>

            <h3 style="color: #E74C3C;">Transaction Details</h3>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Attempted Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

            <h3 style="color: #E74C3C;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #E74C3C; color: white;">
                  <th style="text-align:center;">Product Name</th>
                  <th style="text-align:center;">Quantity</th>
                  <th style="text-align:center;">Total Price</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    product => `
                    <tr>
                      <td style="text-align:center;">${product.product_name}</td>
                      <td style="text-align:center;">${product.quantity}</td>
                      <td style="text-align:center;">$${product.total_price}</td>
                    </tr>
                  `,
                  )
                  .join('')}
              </tbody>
            </table>

            <hr style="border: 1px solid #ccc; margin: 20px 0;">

            <p style="color: #E74C3C;">The purchase process failed due to an issue. Please verify the payment information from the Payment Management System (e.g., Stripe Dashboard) and contact the customer for further assistance.</p>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendOrderCanceledByAdminNotifyEmail = async ({
  email,
  data,
  text,
}: {
  email: string;
  data: any;
  text: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${email}`,
    subject: 'Your Order Has Been Canceled - ProStrikers',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
            
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
            </div>

            <h2 style="color: #E74C3C;">Order Cancellation Notification - ProStrikers</h2>
            <p>Dear user,</p>

            <p>We regret to inform you that your order has been canceled. Below are the details of your canceled order:</p>

            <h3 style="color: #E74C3C;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #E74C3C; color: white;">
                  <th style="text-align:center;">Product</th>
                  <th style="text-align:center;">Color</th>
                  <th style="text-align:center;">Size</th>
                  <th style="text-align:center;">Quantity</th>
                  <th style="text-align:center;">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                      <td style="text-align:center;">${data?.product?.name}</td>
                      <td style="text-align:center;">${data?.color}</td>
                      <td style="text-align:center;">${data?.size}</td>
                      <td style="text-align:center;">${data?.quantity}</td>
                      <td style="text-align:center;">$${data?.total_price}</td>
                    </tr>
              </tbody>
            </table>

            <h3 style="color: #E74C3C;">Cancel Reason</h3>
            <p>${text}</p>

            <h3 style="color: #E74C3C;">Refund Process</h3>
            <p>We understand that this may cause some inconvenience, and we would like to assure you that we are processing your refund as quickly as possible. The amount will be credited back to your original payment method, and you should see the refund shortly.</p>

            <p>If you have any questions or concerns, feel free to reach out to us.</p>

            <p style="color: #E74C3C;">Thank you for your understanding.</p>

            <hr style="border: 1px solid #ccc; margin: 20px 0;">
            <p>Best Regards, <br> The ProStrikers Team</p>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendOrderCanceledByUserNotifyEmail = async ({
  email,
  data,
  text,
}: {
  email: string;
  data: any;
  text: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${email}`,
    subject: 'Your Order Has Been Canceled - ProStrikers',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
            
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
            </div>

            <h2 style="color: #E74C3C;">Order Cancellation Notification - ProStrikers</h2>
            <p>Dear ${data.first_name} ${data.last_name},</p>

            <p>We regret to inform you that your order has been canceled. Below are the details of your canceled order:</p>

            <h3 style="color: #E74C3C;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #E74C3C; color: white;">
                  <th style="text-align:center;">Product</th>
                  <th style="text-align:center;">Color</th>
                  <th style="text-align:center;">Size</th>
                  <th style="text-align:center;">Quantity</th>
                  <th style="text-align:center;">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                      <td style="text-align:center;">${data?.product?.name}</td>
                      <td style="text-align:center;">${data?.color}</td>
                      <td style="text-align:center;">${data?.size}</td>
                      <td style="text-align:center;">${data?.quantity}</td>
                      <td style="text-align:center;">$${data?.total_price}</td>
                    </tr>
              </tbody>
            </table>

            <h3 style="color: #E74C3C;">Cancel Reason</h3>
            <p>${text}</p>

            <h3 style="color: #E74C3C;">Refund Process</h3>
            <p>We understand that this may cause some inconvenience, and we would like to assure you that we are processing your refund as quickly as possible. The amount will be credited back to your original payment method, and you should see the refund shortly.</p>

            <p>If you have any questions or concerns, feel free to reach out to us.</p>

            <p style="color: #E74C3C;">Thank you for your understanding.</p>

            <hr style="border: 1px solid #ccc; margin: 20px 0;">
            <p>Best Regards, <br> The ProStrikers Team</p>
          </div>
        </body>
      </html>
    `,
  });

  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'User Order Cancellation Notification - ProStrikers',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
            
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
            </div>
  
            <h2 style="color: #E74C3C;">Order Cancellation Notification - ProStrikers</h2>
            <p>Dear Admin,</p>
  
            <p>The following order has been canceled by the user. Please review the details below:</p>
  
            <h3 style="color: #E74C3C;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #E74C3C; color: white;">
                  <th style="text-align:center;">Product</th>
                  <th style="text-align:center;">Color</th>
                  <th style="text-align:center;">Size</th>
                  <th style="text-align:center;">Quantity</th>
                  <th style="text-align:center;">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align:center;">${data?.product?.name}</td>
                  <td style="text-align:center;">${data?.color}</td>
                  <td style="text-align:center;">${data?.size}</td>
                  <td style="text-align:center;">${data?.quantity}</td>
                  <td style="text-align:center;">$${data?.total_price}</td>
                </tr>
              </tbody>
            </table>
  
            <h3 style="color: #E74C3C;">Cancel Reason</h3>
            <p>${text}</p>
  
            <h3 style="color: #E74C3C;">Refund Process</h3>
            <p>Please process the refund for this order as soon as possible. The amount should be credited back to the user's original payment method promptly to ensure customer satisfaction. Kindly prioritize this action to avoid any delays or inconvenience.</p>
  
            <hr style="border: 1px solid #ccc; margin: 20px 0;">
            <p>Best Regards, <br> The ProStrikers Team</p>
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
                    <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YYYY')}</td>
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
    html: `<p>Use this code <span style="font-size:18px; font-weight:600">${code}</span> to reset your password</p>`,
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
