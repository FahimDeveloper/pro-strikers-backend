import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Gmail is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidation,
  refreshTokenValidation,
};
