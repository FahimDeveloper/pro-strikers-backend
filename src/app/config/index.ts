import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_local_url: process.env.DATABASE_LOCAL_URL,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_email_access_secret: process.env.JWT_EMAIL_ACCESS_SECRET,
  jwt_temp_booking_access_secret: process.env.JWT_TEMP_BOOKING_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_remember_access_expires_in: process.env.JWT_REMEMBER_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_remember_refresh_expires_in: process.env.JWT_REMEMBER_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  web_app_live_ui_link: process.env.WEB_APP_LIVE_UI_LINK,
  web_app_test_ui_link: process.env.WEB_APP_TEST_UI_LINK,
  web_app_local_ui_link: process.env.WEB_APP_LOCAL_UI_LINK,
  website_live_ui_link: process.env.WEBSITE_LIVE_UI_LINK,
  website_test_ui_link: process.env.WEBSITE_TEST_UI_LINK,
  website_local_ui_link: process.env.WEBSITE_LOCAL_UI_LINK,
  notify_email: process.env.NOTIFY_EMAIL,
  emitrr_email: process.env.EMITRR_EMAIL,
  node_mailer_mail: process.env.NODEMAILER_MAIL,
  node_mailer_mail_pass: process.env.NODEMAILER_MAIL_PASS,
  stripe_sk_key: process.env.STRIPE_SK_KEY,
};
