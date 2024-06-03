import { string } from 'zod';

declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DATABASE_LOCAL_URL: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REMEMBER_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    JWT_REMEMBER_REFRESH_EXPIRES_IN: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: number;
    CLOUDINARY_API_SECRET: string;
    RESET_PASS_UI_LINK: string;
  };
}
