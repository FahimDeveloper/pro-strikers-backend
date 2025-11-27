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

export const sendFacilityGiftCardToBuyer = ({
  email,
  amount,
  giftCode,
}: {
  email: string;
  amount: number;
  giftCode: string;
}) => {
  transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'Your Prostrikers Black Friday Gift Card',
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Your Gift Card</title>
<style>
  body { font-family: Arial, sans-serif; background:#f5f5f5; padding:20px; }
  .container { max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; }
  .brand { text-align:center; font-size:32px; font-weight:700; color:#0EBBBC; margin-bottom:25px; }
  .headline { font-size:22px; font-weight:600; text-align:center; margin-bottom:10px; }
  .amount { text-align:center; font-size:20px; margin-bottom:20px; }
  .code-box { background:#0EBBBC; color:#fff; padding:18px; text-align:center; font-size:26px; font-weight:700; border-radius:6px; margin-bottom:25px; letter-spacing:2px; }
  .instructions { font-size:15px; color:#444; line-height:1.6; margin-bottom:35px; }
  .important-note { 
    font-size:15px; 
    color:#222; 
    background:#EFFFFB; 
    border-left:4px solid #0EBBBC; 
    padding:12px 15px; 
    margin-bottom:25px;
  }
  .footer { text-align:center; font-size:13px; color:#666; margin-top:20px; }
  .footer a { color:#0EBBBC; text-decoration:none; font-weight:600; }
</style>
</head>
<body>
<div class="container">

  <div class="brand">Prostrikers</div>

  <div class="headline">Your Black Friday Gift Card Has Arrived</div>

  <div class="amount">Value: <strong>${amount}</strong></div>

  <div class="code-box">${giftCode}</div>

  <div class="instructions">
    Apply this code as a voucher to redeem your gift card balance.
    Enter it exactly as shown above.
  </div>

  <div class="important-note">
    Create an account using this email on our website, or log in if you already have an account associated with this email. This gift card will be active from <strong>December 8th, 2025</strong> and will remain valid for the next <strong>6 months</strong>.
  </div>

  <div class="footer">
    Thank you for shopping with us!<br>
    <a href="https://prostrikers.com">prostrikers.com</a>
  </div>

</div>
</body>
</html>
`,
  });

  return;
};

export const sendFacilityGiftCardToRecipient = ({
  email,
  amount,
  giftCode,
  sender,
}: {
  email: string;
  amount: number;
  giftCode: string;
  sender: string;
}) => {
  transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'You’ve Received a Prostrikers Gift Card',
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Your Gift Card</title>
<style>
  body { font-family: Arial, sans-serif; background:#f5f5f5; padding:20px; }
  .container { max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; }
  .brand { text-align:center; font-size:32px; font-weight:700; color:#0EBBBC; margin-bottom:25px; }
  .headline { font-size:22px; font-weight:600; text-align:center; margin-bottom:5px; }
  .message { font-size:16px; text-align:center; color:#444; margin:15px 0 25px; line-height:1.6; }
  .amount { text-align:center; font-size:20px; margin-bottom:20px; }
  .code-box { background:#0EBBBC; color:#fff; padding:18px; text-align:center; font-size:26px; font-weight:700; border-radius:6px; margin-bottom:25px; letter-spacing:2px; }
  .instructions { font-size:15px; color:#444; line-height:1.6; margin-bottom:35px; }
  .important-note { 
    font-size:15px; 
    color:#222; 
    background:#EFFFFB; 
    border-left:4px solid #0EBBBC; 
    padding:12px 15px; 
    margin-bottom:25px;
  }
  .footer { text-align:center; font-size:13px; color:#666; margin-top:20px; }
  .footer a { color:#0EBBBC; text-decoration:none; font-weight:600; }
</style>
</head>
<body>
<div class="container">

  <div class="brand">Prostrikers</div>

  <div class="headline">You’ve Received a Gift Card</div>

  <div class="message">
    <a href="mailto:${sender}">Prostrikers User</a> has sent you a Black Friday gift card from Prostrikers.
    Use it anytime during checkout.
  </div>

  <div class="amount">Value: <strong>${amount}</strong></div>

  <div class="code-box">${giftCode}</div>

  <div class="instructions">
    Apply this code as a voucher to redeem your gift card balance.
    Enter it exactly as shown above.
  </div>

  <div class="important-note">
    Create an account using this email on our website, or log in if you already have an account associated with this email. This gift card will be active from <strong>December 8th, 2025</strong> and will remain valid for the next <strong>6 months</strong>.
  </div>

  <div class="footer">
    Enjoy your gift!<br>
    <a href="https://prostrikers.com">prostrikers.com</a>
  </div>

</div>
</body>
</html>
`,
  });

  return;
};

export const sendShopifyGiftCardToBuyer = ({
  email,
  amount,
  giftCode,
}: {
  email: string;
  amount: number;
  giftCode: string;
}) => {
  transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'Your Prostrikers Black Friday Gift Card',
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Your Gift Card</title>
<style>
  body { font-family: Arial, sans-serif; background:#f5f5f5; padding:20px; }
  .container { max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; }
  .brand { text-align:center; font-size:32px; font-weight:700; color:#0EBBBC; margin-bottom:25px; }
  .headline { font-size:22px; font-weight:600; text-align:center; margin-bottom:10px; }
  .amount { text-align:center; font-size:20px; margin-bottom:20px; }
  .code-box { background:#0EBBBC; color:#fff; padding:18px; text-align:center; font-size:26px; font-weight:700; border-radius:6px; margin-bottom:25px; letter-spacing:2px; }
  .instructions { font-size:15px; color:#444; line-height:1.6; margin-bottom:35px; }
  .important-note { 
    font-size:15px; 
    color:#222; 
    background:#EFFFFB; 
    border-left:4px solid #0EBBBC; 
    padding:12px 15px; 
    margin-bottom:25px;
  }
  .footer { text-align:center; font-size:13px; color:#666; margin-top:20px; }
  a { color:#0EBBBC; text-decoration:none; font-weight:600; }
</style>
</head>
<body>
<div class="container">

  <div class="brand">Prostrikers</div>

  <div class="headline">Your Black Friday Gift Card Has Arrived</div>

  <div class="amount">Value: <strong>${amount}</strong></div>

  <div class="code-box">${giftCode}</div>

  <div class="instructions">
    You can redeem your gift card anytime at checkout on our Shop <a href="https://shop.prostrikers.com">shop.prostrikers.com</a> website.
    Just enter the code exactly as shown above to apply your balance.
  </div>

  <div class="important-note">
    This gift card will be active from <strong>December 8th, 2025</strong> 
    and will remain valid for the next <strong>6 months</strong>.
  </div>

  <div class="footer">
    Thank you for shopping with us!<br>
    <a href="https://prostrikers.com">prostrikers.com</a>
  </div>

</div>
</body>
</html>
`,
  });

  return;
};

export const sendShopifyGiftCardToRecipient = ({
  email,
  amount,
  giftCode,
  sender,
}: {
  email: string;
  amount: number;
  giftCode: string;
  sender: string;
}) => {
  transporter.sendMail({
    from: 'ProStrikers <admin@prostrikers.com>',
    to: email,
    subject: 'You’ve Received a Prostrikers Gift Card',
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Your Gift Card</title>
<style>
  body { font-family: Arial, sans-serif; background:#f5f5f5; padding:20px; }
  .container { max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; }
  .brand { text-align:center; font-size:32px; font-weight:700; color:#0EBBBC; margin-bottom:25px; }
  .headline { font-size:22px; font-weight:600; text-align:center; margin-bottom:5px; }
  .message { font-size:16px; text-align:center; color:#444; margin:15px 0 25px; line-height:1.6; }
  .amount { text-align:center; font-size:20px; margin-bottom:20px; }
  .code-box { background:#0EBBBC; color:#fff; padding:18px; text-align:center; font-size:26px; font-weight:700; border-radius:6px; margin-bottom:25px; letter-spacing:2px; }
  .instructions { font-size:15px; color:#444; line-height:1.6; margin-bottom:35px; }
  .important-note { 
    font-size:15px; 
    color:#222; 
    background:#EFFFFB; 
    border-left:4px solid #0EBBBC; 
    padding:12px 15px; 
    margin-bottom:25px;
  }
  .footer { text-align:center; font-size:13px; color:#666; margin-top:20px; }
   a { color:#0EBBBC; text-decoration:none; font-weight:600; }
</style>
</head>
<body>
<div class="container">

  <div class="brand">Prostrikers</div>

  <div class="headline">You’ve Received a Gift Card</div>

  <div class="message">
    <a href="mailto:${sender}">Prostrikers User</a> has sent you a Black Friday gift card from Prostrikers.
    Use it anytime on Prostrikers Shop <a href="https://shop.prostrikers.com">shop.prostrikers.com</a> during checkout.
  </div>

  <div class="amount">Value: <strong>${amount}</strong></div>

  <div class="code-box">${giftCode}</div>

  <div class="instructions">
    Apply this code during checkout to redeem your gift card balance.
    Enter it exactly as shown above.
  </div>

  <div class="important-note">
    This gift card will be active from <strong>December 8th, 2025</strong> 
    and will remain valid for the next <strong>6 months</strong>.
  </div>

  <div class="footer">
    Enjoy your gift!<br>
    <a href="https://prostrikers.com">prostrikers.com</a>
  </div>

</div>
</body>
</html>
`,
  });

  return;
};

export const sendFeedbackEmail = async ({
  name,
  email,
  phone_number,
  message,
}: {
  name: string;
  email: string;
  phone_number: string;
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
        <p><strong style="color: #0ABAC3;">Number:</strong> ${phone_number}</p>
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
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.emitrr_email}`,
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
        <p><strong style="color: #0ABAC3;">Number:</strong> ${phone_number}</p>
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

export const sendRentalBookingConfirmationEmail = ({
  transactionId,
  user,
  email,
  bookings,
  amount,
}: {
  user: any;
  email: string;
  bookings: any;
  amount: number;
  transactionId: string;
}) => {
  transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Booking Confirmation',
    html: `
            <html>
  <head>
    <style>
      /* Default styles */
      .table-container {
        display: block;
      }

      .mobile-container {
        display: none;
      }

      /* Styles for screens smaller than 640px */
      @media (max-width: 640px) {
        .table-container {
          display: none;
        }

        .mobile-container {
          display: block;
        }
      }

      .addon-item {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
      }

      .addon-item img {
        max-width: 100px;
        display: block;
        margin-top: 5px;
      }

      .mobile-item {
        background-color: #f4f4f4;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .mobile-item h4 {
        margin: 0 0 5px 0;
        color: #0ABAC3;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
      
      <!-- Logo Section -->
      <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
      </div>

      <h2 style="color: #0ABAC3;">Booking Confirmation - ProStrikers</h2>
      <p>Dear ${user.first_name} ${user.last_name},</p>
      <p>We are pleased to confirm your booking at ProStrikers! Below are your booking details:</p>
      
      <!-- Table for larger screens -->
      <div class="table-container">
        <h3 style="color: #0ABAC3;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
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
                </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Mobile-friendly details for smaller screens -->
<div class="mobile-container">
  ${bookings.bookings
    .map(
      (booking: any) => `
      <div class="mobile-card">
        <div class="mobile-card-header">
          <h3 style="margin: 0; color: #0ABAC3;">Booking For ${moment(booking.date).format('dddd, MMM Do YYYY')}</h3>
        </div>
        <div class="mobile-card-body">
          <p><strong>Sport:</strong> ${bookings.sport}</p>
          <p><strong>Time Slot:</strong> ${booking.time_slot}</p>
          <p><strong>Area:</strong> ${booking.lane}</p>
        </div>
      </div>`,
    )
    .join('')}
</div>


      <h3 style="color: #0ABAC3; margin-top: 20px;">Add-ons</h3>
      ${
        bookings.addons.length > 0
          ? bookings.addons
              .map(
                (addon: any) => `
                <div class="addon-item">
                  <strong>${addon.name}</strong> - ${addon.hours === 0.5 ? '30 minutes' : `${addon.hours} hours`}
                  <img src="${addon.image}" alt="${addon.name}">
                </div>`,
              )
              .join('')
          : '<p>No add-ons selected.</p>'
      }

      <h3 style="color: #0ABAC3; margin-top: 20px;">Payment Information</h3>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
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
  transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'New Booking Alert - ProStrikers',
    html: `
        <html>
  <head>
    <style>
      /* Default styles */
      .table-container {
        display: block;
      }

      .mobile-container {
        display: none;
      }

      /* Media query for screens smaller than 640px */
      @media (max-width: 640px) {
        .table-container {
          display: none;
        }

        .mobile-container {
          display: block;
        }
      }

      .mobile-item {
        background-color: #f4f4f4;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .mobile-item h4 {
        margin: 0 0 5px 0;
        color: #0ABAC3;
      }

      .addon-item {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
      }

      .addon-item img {
        max-width: 100px;
        display: block;
        margin-top: 5px;
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

      
      <!-- Table for larger screens -->
      <div class="table-container">
      <h3 style="color: #0ABAC3;">Booking Details</h3>
        <div style="overflow-x: auto; margin-top: 10px;">
          <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
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
                  </tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile-friendly details for smaller screens -->
<div class="mobile-container">
  ${bookings.bookings
    .map(
      (booking: any) => `
      <div class="mobile-card">
       <div class="mobile-card-header">
          <h3 style="margin: 0; color: #0ABAC3;">Booking For ${moment(booking.date).format('dddd, MMM Do YYYY')}</h3>
        </div>
        <div class="mobile-card-body">
          <p><strong>Sport:</strong> ${bookings.sport}</p>
          <p><strong>Time Slot:</strong> ${booking.time_slot}</p>
          <p><strong>Area:</strong> ${booking.lane}</p>
        </div>
      </div>`,
    )
    .join('')}
</div>


      <h3 style="color: #0ABAC3; margin-top: 20px;">Add-ons</h3>
      ${
        bookings.addons.length > 0
          ? bookings.addons
              .map(
                (addon: any) => `
                <div class="addon-item">
                  <strong>${addon.name}</strong> - ${addon.hours === 0.5 ? '30 minutes' : `${addon.hours} hours`}
                  <img src="${addon.image}" alt="${addon.name}">
                </div>`,
              )
              .join('')
          : '<p>No add-ons selected.</p>'
      }

      <h3 style="color: #0ABAC3;">Payment Information</h3>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

      <hr style="border: 1px solid #ccc; margin: 20px 0;">

      <p>If you have any questions or need assistance with this booking, please reach out to the team.</p>
    </div>
  </body>
</html>

      `,
  });
};

export const sendRentalBookingPaymentEmail = ({
  first_name,
  last_name,
  expiry,
  email,
  bookings,
  amount,
  link,
}: {
  first_name: string | undefined;
  last_name: string;
  expiry: string;
  email: string;
  bookings: any;
  amount: number;
  link: string;
}) => {
  transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Complete Your Payment Now',
    html: `
            <html>
  <head>
    <style>
      /* Default styles */
      .table-container {
        display: block;
      }

      .mobile-container {
        display: none;
      }

      /* Styles for screens smaller than 640px */
      @media (max-width: 640px) {
        .table-container {
          display: none;
        }

        .mobile-container {
          display: block;
        }
      }

      .addon-item {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
      }

      .addon-item img {
        max-width: 100px;
        display: block;
        margin-top: 5px;
      }

      .mobile-item {
        background-color: #f4f4f4;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .mobile-item h4 {
        margin: 0 0 5px 0;
        color: #0ABAC3;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
      
      <!-- Logo Section -->
      <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
      </div>

      <h2 style="color: #0ABAC3;">Booking Pending Payment - ProStrikers</h2>
      <p>Dear ${first_name} ${last_name},</p>
      <p>We are pleased your booking at ProStrikers! Please pay your due to confirm your booking. Link will be expire after ${expiry === '1h' ? '1 hour' : '30 minutes'}</p>
      
      <!-- Table for larger screens -->
      <div class="table-container">
        <h3 style="color: #0ABAC3;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
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
                </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Mobile-friendly details for smaller screens -->
<div class="mobile-container">
  ${bookings.bookings
    .map(
      (booking: any) => `
      <div class="mobile-card">
        <div class="mobile-card-header">
          <h3 style="margin: 0; color: #0ABAC3;">Booking For ${moment(booking.date).format('dddd, MMM Do YYYY')}</h3>
        </div>
        <div class="mobile-card-body">
          <p><strong>Sport:</strong> ${bookings.sport}</p>
          <p><strong>Time Slot:</strong> ${booking.time_slot}</p>
          <p><strong>Area:</strong> ${booking.lane}</p>
        </div>
      </div>`,
    )
    .join('')}
</div>


      <h3 style="color: #0ABAC3; margin-top: 20px;">Add-ons</h3>
      ${
        bookings.addons.length > 0
          ? bookings.addons
              .map(
                (addon: any) => `
                <div class="addon-item">
                  <strong>${addon.name}</strong> - ${addon.hours === 0.5 ? '30 minutes' : `${addon.hours} hours`}
                  <img src="${addon.image}" alt="${addon.name}">
                </div>`,
              )
              .join('')
          : '<p>No add-ons selected.</p>'
      }

      <h3 style="color: #0ABAC3; margin-top: 20px;">Payment Information</h3>
      <p><strong>Payment Link:</strong> <a href="${link}">${link}</a></p>
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
};

export const sendCustomMembershipPaymentEmail = async ({
  email,
  amount,
  expiry,
  link,
  team,
  team_name,
}: {
  email: string;
  amount: number;
  expiry: string;
  link: string;
  team: { email: string; role: string }[];
  team_name: string;
}) => {
  const teamRows = team
    .map(
      (member: any) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; text-transform: lowercase;">${member.email}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-transform: capitalize;">${member.role}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head><meta charset="UTF-8" /></head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: #fff; border-radius: 8px; padding: 20px; box-sizing: border-box;">
                <tr>
                  <td>
                    <!-- Logo/Brand -->
                    <h1 style="color: #0ABAC3; margin-bottom: 30px;">ProStrikers</h1>

                    <!-- Highlighted Notice -->
                    <div style="
                      background-color: #d1ecf1;
                      border-left: 6px solid #0ABAC3;
                      padding: 15px 20px;
                      margin-bottom: 25px;
                      border-radius: 5px;
                      color: #0c5460;
                      font-size: 15px;
                    ">
                      <strong>Important:</strong> Before proceeding with the payment, please <strong>log in</strong> to your account.
                    </div>

                    <h2 style="color: #0ABAC3; margin-top: 0;">Membership Payment Pending for ${team_name}</h2>
                    <p style="font-size: 14px;">
                      Thank you for choosing the <strong>Team & Organizations</strong> membership.
                    </p>
                    <p style="font-size: 14px;">
                      Please complete your payment to activate your membership. This link will expire in <strong>${expiry}</strong>.
                    </p>

                    <h3 style="color: #0ABAC3; margin-top: 30px;">Team Members</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background-color: #0ABAC3; color: white;">
                          <th style="text-align: left; padding: 10px;">Email</th>
                          <th style="text-align: left; padding: 10px;">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${teamRows}
                      </tbody>
                    </table>

                    <h3 style="color: #0ABAC3; margin-top: 30px;">Payment Details</h3>
                    <p style="font-size: 14px;">
                      <strong>Total Amount:</strong> $${amount.toFixed(2)}
                    </p>

                    <p style="text-align: center; margin: 40px 0;">
                      <a href="${link}" style="
                        background-color: #72B626;
                        color: white;
                        padding: 14px 30px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        display: inline-block;
                      ">Complete Payment</a>
                    </p>

                    <hr style="border: 1px solid #ccc; margin: 40px 0;">

                    <p style="font-size: 13px; color: #666;">
                      If you have any questions, please contact us at
                      <a href="mailto:admin@prostrikers.com" style="color: #0ABAC3;">admin@prostrikers.com</a>
                      or call (916)-890-5834.
                    </p>

                    <p style="font-size: 13px; color: #666;">
                      Address: 2230 16th St, Sacramento, CA 95818, United States
                    </p>

                    <p style="font-size: 13px; color: #666;">
                      Thank you for choosing ProStrikers! We look forward to your visit.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"ProStrikers" <${config.notify_email}>`,
    to: email,
    subject: `Membership Payment Pending for ${team_name} - ProStrikers`,
    html,
  });
};

export const sendTeamMembershipNotificationEmail = async ({
  email,
  team,
  team_name,
}: {
  email: string;
  team: { email: string; role: string }[];
  team_name: string;
}) => {
  const teamRows = team
    .map(
      member => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${member.email}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-transform: capitalize;">${member.role}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head><meta charset="UTF-8" /></head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: #fff; border-radius: 8px; padding: 20px; box-sizing: border-box;">
                <tr>
                  <td>
                    <h1 style="color: #0ABAC3; margin-bottom: 30px;">ProStrikers</h1>

                    <h2 style="color: #0ABAC3; margin-top: 0;">Team Membership Activated</h2>
                    <p style="font-size: 14px;">
                      You're receiving this email because your team <strong>${team_name}</strong> has purchased a membership plan.
                    </p>

                    <p style="font-size: 14px;">
                      Below is the list of your team members:
                    </p>

                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background-color: #0ABAC3; color: white;">
                          <th style="text-align: left; padding: 10px;">Email</th>
                          <th style="text-align: left; padding: 10px;">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${teamRows}
                      </tbody>
                    </table>

                    <p style="font-size: 13px; color: #666; margin-top: 30px;">
                      If you have any questions, contact us at 
                      <a href="mailto:admin@prostrikers.com" style="color: #0ABAC3;">admin@prostrikers.com</a>
                      or (916)-890-5834.
                    </p>

                    <p style="font-size: 13px; color: #666;">
                      Address: 2230 16th St, Sacramento, CA 95818, United States
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"ProStrikers" <${config.notify_email}>`,
    to: email,
    subject: `You're Part of ${team_name}'s Membership - ProStrikers`,
    html,
  });
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

            <p style="color: #E74C3C;">The process failed due to an issue. Please verify the payment information from Payment managment system and contact with the user for further assistance.</p>
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
  invoiceId,
  email,
  amount,
  subscription,
  subscription_plan,
  issue_date,
  expiry_date,
}: {
  invoiceId: string;
  email: string;
  amount: number;
  subscription: string;
  subscription_plan: string;
  issue_date: string;
  expiry_date: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Membership Purchase Confirmation',
    html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin: 0;
      }
      h2, h3 {
        color: #0ABAC3;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        text-align: center;
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #0ABAC3;
        color: white;
      }
      .contact-info {
        margin-top: 20px;
      }
      a {
        color: #0ABAC3;
        text-decoration: none;
      }
      hr {
        border: 1px solid #ccc;
        margin: 20px 0;
      }
      /* Responsive Design */
      @media screen and (max-width: 640px) {
        .container {
          padding: 15px;
        }
        table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        .responsive-details {
          display: none;
        }
        .mobile-details {
          display: block;
        }
      }
      @media screen and (min-width: 641px) {
        .mobile-details {
          display: none;
        }
      }
      .mobile-card {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .mobile-card h4 {
        margin: 0;
        color: #0ABAC3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Logo Section -->
      <div class="logo">
        <h1>ProStrikers</h1>
      </div>

      <h2>Membership Purchase Confirmation</h2>
      <p>Dear Customer,</p>
      <p>Thank you for purchasing a membership at ProStrikers! Below are your membership details:</p>

      <h3>Membership Details</h3>
      <!-- Responsive Details -->
      <div class="responsive-details">
        <table>
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Plan</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${subscription}</td>
              <td>${subscription_plan}</td>
              <td>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
              <td>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile-Friendly Details -->
      <div class="mobile-details">
        <div class="mobile-card">
          <h4>Package Name:</h4>
          <p>${subscription}</p>
          <h4>Plan:</h4>
          <p>${subscription_plan}</p>
          <h4>Issue Date:</h4>
          <p>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
          <h4>Expiry Date:</h4>
          <p>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
        </div>
      </div>

      <h3 style="color: #0ABAC3;">Payment Information</h3>
      <h4>Payment By Stripe</h4>
      <p><strong>Invoice ID:</strong> ${invoiceId}</p>
      <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

      <hr>

      <p>If you have any questions about your membership, please don't hesitate to contact us.</p>

      <h3>Contact Information</h3>
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
          <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin: 0;
      }
      h2, h3 {
        color: #0ABAC3;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        text-align: center;
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #0ABAC3;
        color: white;
      }
      .contact-info {
        margin-top: 20px;
      }
      a {
        color: #0ABAC3;
        text-decoration: none;
      }
      hr {
        border: 1px solid #ccc;
        margin: 20px 0;
      }
      /* Responsive Design */
      @media screen and (max-width: 640px) {
        .container {
          padding: 15px;
        }
        table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        .responsive-details {
          display: none;
        }
        .mobile-details {
          display: block;
        }
      }
      @media screen and (min-width: 641px) {
        .mobile-details {
          display: none;
        }
      }
      .mobile-card {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .mobile-card h4 {
        margin: 0;
        color: #0ABAC3;
      }
    </style>
  </head>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">

                  <!-- Logo Section -->
      <div class="logo">
        <h1>ProStrikers</h1>
      </div>

                <h2 style="color: #0ABAC3;">New Membership Purchased</h2>
                <p><strong>User Email:</strong> ${email}</p>
                <p>A new membership has been purchased. Below are the details:</p>

                <h3>Membership Details</h3>
      <!-- Responsive Details -->
      <div class="responsive-details">
        <table>
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Plan</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${subscription}</td>
              <td>${subscription_plan}</td>
              <td>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
              <td>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile-Friendly Details -->
      <div class="mobile-details">
        <div class="mobile-card">
          <h4>Package Name:</h4>
          <p>${subscription}</p>
          <h4>Plan:</h4>
          <p>${subscription_plan}</p>
          <h4>Issue Date:</h4>
          <p>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
          <h4>Expiry Date:</h4>
          <p>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
        </div>
      </div>

                <h3 style="color: #0ABAC3;">Payment Information</h3>
                <h4>Payment By Stripe</h4>
                <p><strong>Invoice ID:</strong> ${invoiceId}</p>
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

export const sendMembershipChangeConfirmationEmail = async ({
  invoiceId,
  email,
  amount,
  subscription,
  subscription_plan,
  issue_date,
  expiry_date,
}: {
  invoiceId: string;
  email: string;
  amount: number;
  subscription: string;
  subscription_plan: string;
  issue_date: string;
  expiry_date: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: email,
    subject: 'ProStrikers - Membership Purchase Confirmation',
    html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin: 0;
      }
      h2, h3 {
        color: #0ABAC3;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        text-align: center;
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #0ABAC3;
        color: white;
      }
      .contact-info {
        margin-top: 20px;
      }
      a {
        color: #0ABAC3;
        text-decoration: none;
      }
      hr {
        border: 1px solid #ccc;
        margin: 20px 0;
      }
      /* Responsive Design */
      @media screen and (max-width: 640px) {
        .container {
          padding: 15px;
        }
        table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        .responsive-details {
          display: none;
        }
        .mobile-details {
          display: block;
        }
      }
      @media screen and (min-width: 641px) {
        .mobile-details {
          display: none;
        }
      }
      .mobile-card {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .mobile-card h4 {
        margin: 0;
        color: #0ABAC3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Logo Section -->
      <div class="logo">
        <h1>ProStrikers</h1>
      </div>

      <h2>Membership Purchase Confirmation</h2>
      <p>Dear Customer,</p>
      <p>Thank you for purchasing a membership at ProStrikers! Below are your membership details:</p>

      <h3>Membership Details</h3>
      <!-- Responsive Details -->
      <div class="responsive-details">
        <table>
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Plan</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${subscription}</td>
              <td>${subscription_plan}</td>
              <td>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
              <td>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile-Friendly Details -->
      <div class="mobile-details">
        <div class="mobile-card">
          <h4>Package Name:</h4>
          <p>${subscription}</p>
          <h4>Plan:</h4>
          <p>${subscription_plan}</p>
          <h4>Issue Date:</h4>
          <p>${moment(issue_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
          <h4>Expiry Date:</h4>
          <p>${moment(expiry_date).tz('America/Los_Angeles').format('ddd, MMM Do YY')}</p>
        </div>
      </div>

      <h3 style="color: #0ABAC3;">Payment Information</h3>
      <h4>Payment By Stripe</h4>
      <p><strong>Invoice ID:</strong> ${invoiceId}</p>
      <p><strong>Total Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>

      <hr>

      <p>If you have any questions about your membership, please don't hesitate to contact us.</p>

      <h3>Contact Information</h3>
      <p>Email: <a href="mailto:admin@prostrikers.com">admin@prostrikers.com</a></p>
      <p>Phone: (916)-890-5834</p>
      <p>Address: 2230 16th St, Sacramento, CA 95818, United States</p>

      <p>Thank you for choosing ProStrikers! We look forward to serving you.</p>
    </div>
  </body>
</html>

      `,
  });
  return;
};

export const sendMembershipRenewFailedNotifyEmail = async ({
  invoiceId,
  email,
  amount,
  subscription,
  subscription_plan,
}: {
  invoiceId: string;
  email: string;
  amount: number;
  subscription: string;
  subscription_plan: string;
  issue_date: string;
  expiry_date: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Membership Payment Failed - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>
  
                  <h2 style="color: #E74C3C;">Membership Payment Failed</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following membership payment attempt failed. Please review the details below:</p>

                  <h3 style="color: #E74C3C;">Membership Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #E74C3C; color: white;">
                        <th style="text-align:center;">Package Name</th>
                        <th style="text-align:center;">Plan</th>
                        <th style="text-align:center;">Renew/Due Attempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align:center;">${subscription}</td>
                        <td style="text-align:center;">${subscription_plan}</td>
                        <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  <h3 style="color: #E74C3C;">Payment Information</h3>
                  <p><strong>Due Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Invoice ID:</strong> ${invoiceId}</p>
                 

                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <h3 style="color: #E74C3C;">Contact Information</h3>
                  <p>Email: <a href="mailto:${email}">${email}</a></p>
  
                  <p>Thank you for using ProStrikers Admin Services.</p>
                </div>
              </body>
            </html>
          `,
  });
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${email}`,
    subject: 'Membership Payment Failed - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>

                  <h2 style="color: #E74C3C;">Membership Payment Failed</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following membership payment attempt failed. Please review the details below:</p>

                  <h3 style="color: #E74C3C;">Membership Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #E74C3C; color: white;">
                        <th style="text-align:center;">Package Name</th>
                        <th style="text-align:center;">Plan</th>
                        <th style="text-align:center;">Renew Attempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align:center;">${subscription}</td>
                        <td style="text-align:center;">${subscription_plan}</td>
                        <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  <h3 style="color: #E74C3C;">Payment Information</h3>
                  <p><strong>Due Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Invoice ID:</strong> ${invoiceId}</p>
                  <p>Please complete the due payment to avoid any interruption in service.</p>
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <p>Thank you for using ProStrikers Services.</p>
                </div>
              </body>
            </html>
          `,
  });
  return;
};

export const sendMembershipRenewSuccessNotifyEmail = async ({
  invoiceId,
  email,
  amount,
  subscription,
  subscription_plan,
}: {
  invoiceId: string;
  email: string;
  amount: number;
  subscription: string;
  subscription_plan: string;
  issue_date: string;
  expiry_date: string;
}) => {
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${config.notify_email}`,
    subject: 'Membership Renewal Success - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>

                  <h2 style="color: #0ABAC3;">Membership Renewal Success</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following membership renewal attempt was successful. Please review the details below:</p>

                  <h3 style="color: #0ABAC3;">Membership Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #0ABAC3; color: white;">
                        <th style="text-align:center;">Package Name</th>
                        <th style="text-align:center;">Plan</th>
                        <th style="text-align:center;">Renew/Due Attempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align:center;">${subscription}</td>
                        <td style="text-align:center;">${subscription_plan}</td>
                        <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  <h3 style="color: #0ABAC3;">Payment Information</h3>
                  <p><strong>Due Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Invoice ID:</strong> ${invoiceId}</p>
                 

                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <h3 style="color: #0ABAC3;">Contact Information</h3>
                  <p>Email: <a href="mailto:${email}">${email}</a></p>
  
                  <p>Thank you for using ProStrikers Admin Services.</p>
                </div>
              </body>
            </html>
          `,
  });
  await transporter.sendMail({
    from: `ProStrikers <${config.notify_email}>`,
    to: `${email}`,
    subject: 'Membership Renewal Success - ProStrikers',
    html: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px; background-color: #ffffff;">
  
                  <!-- Logo Section -->
                  <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="font-size: 1.875rem; line-height: 2.25rem">ProStrikers</h1>
                  </div>
  
                  <h2 style="color: #0ABAC3;">Membership Renewal Success</h2>
                  <p><strong>User Email:</strong> ${email}</p>
                  <p>The following membership renewal attempt was successful. Please review the details below:</p>
  
                  <h3 style="color: #0ABAC3;">Membership Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background-color: #0ABAC3; color: white;">
                        <th style="text-align:center;">Package Name</th>
                        <th style="text-align:center;">Plan</th>
                        <th style="text-align:center;">Renew/Due Attempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align:center;">${subscription}</td>
                        <td style="text-align:center;">${subscription_plan}</td>
                        <td style="text-align:center;">${moment().tz('America/Los_Angeles').format('ddd, MMM Do YY')}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  <h3 style="color: #0ABAC3;">Payment Information</h3>
                  <p><strong>Amount:</strong> $<span style="font-size:14px; font-weight:600;">${amount}</span></p>
                  <p><strong>Invoice ID:</strong> ${invoiceId}</p>
                  <hr style="border: 1px solid #ccc; margin: 20px 0;">
  
                  <p>Thank you for using ProStrikers Services.</p>
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
  
                  <p style="color: #E74C3C;">The process failed due to an issue. Please verify the payment information from Payment managment system  and contact with the user for further assistance.</p>
  
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

export const sendVerifyEmail = ({
  email,
  link,
}: {
  email: string;
  link: string;
}) => {
  transporter.sendMail({
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

export const sendAcademyAccountConfirmationEmail = async ({
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
Your Academy account has been created successfully. Your temporary password is <span style="font-size: 22px; font-weight: 500;">${password}</span>
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

export const sendTempRegisterConfirmationEmail = ({
  email,
  provider,
  password,
}: {
  email: string;
  provider: string;
  password: string;
}) => {
  transporter.sendMail({
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

export const sendSocialLoginConfirmationEmail = ({
  email,
  provider,
  password,
}: {
  email: string;
  provider: string;
  password: string;
}) => {
  transporter.sendMail({
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
