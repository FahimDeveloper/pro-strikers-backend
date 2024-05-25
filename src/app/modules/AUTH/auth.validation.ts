import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Gmail is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// const changePasswordValidationSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({
//       required_error: 'Old password is required',
//     }),
//     newPassword: z.string({ required_error: 'Password is required' }),
//   }),
// });

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

// const forgetPasswordValidationSchema = z.object({
//   body: z.object({
//     id: z.string({
//       required_error: 'User id is required!',
//     }),
//   }),
// });

// const resetPasswordValidationSchema = z.object({
//   body: z.object({
//     id: z.string({
//       required_error: 'User id is required!',
//     }),
//     newPassword: z.string({
//       required_error: 'User password is required!',
//     }),
//   }),
// });

export const AuthValidation = {
  loginValidation,
  refreshTokenValidation,
  // changePasswordValidationSchema,
  // refreshTokenValidationSchema,
  // forgetPasswordValidationSchema,
  // resetPasswordValidationSchema,
};
