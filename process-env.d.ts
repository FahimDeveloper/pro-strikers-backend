import { string } from 'zod';

declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DATABASE_LOCAL_URL: string;
    DATABASE_URL: string;
    BCRYPT_SALT_ROUND: number;
    NODE_ENV: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REMEMBER_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    JWT_REMEMBER_REFRESH_EXPIRES_IN: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    WEB_APP_LIVE_UI_LINK: string;
    WEB_APP_TEST_UI_LINK: string;
    WEB_APP_LOCAL_UI_LINK: string;
    WEBSITE_LIVE_UI_LINK: string;
    WEBSITE_TEST_UI_LINK: string;
    WEBSITE_TEST_UI_LINK: string;
    NODEMAILER_MAIL: string;
    NODEMAILER_MAIL_PASS: string;
    STRIPE_SK_KEY: string;
  };
}
