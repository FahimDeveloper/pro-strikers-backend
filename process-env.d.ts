declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DATABASE_LOCAL_URL: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
  };
}
