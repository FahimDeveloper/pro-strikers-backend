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
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_remember_access_expires_in: process.env.JWT_REMEMBER_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_remember_refresh_expires_in: process.env.JWT_REMEMBER_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  admin_reset_pass_live_ui_link: process.env.ADMIN_RESET_PASS_LIVE_UI_LINK,
  admin_reset_pass_test_ui_link: process.env.ADMIN_RESET_TEST_LIVE_UI_LINK,
  user_reset_pass_live_ui_link: process.env.USER_RESET_PASS_LIVE_UI_LINK,
  user_reset_pass_test_ui_link: process.env.USER_RESET_TEST_LIVE_UI_LINK,
  node_mailer_mail: process.env.NODEMAILER_MAIL,
  node_mailer_mail_pass: process.env.NODEMAILER_MAIL_PASS,
};
