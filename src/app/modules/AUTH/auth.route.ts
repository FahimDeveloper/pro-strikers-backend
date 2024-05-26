import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/user/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginUser,
);

router.post(
  '/admin/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginAdmin,
);

// router.post(
//   '/change-password',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

// router.post(
//   '/forget-password',
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthControllers.forgetPassword,
// );

// router.post(
//   '/reset-password',
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthControllers.resetPassword,
// );

export const AuthRoutes = router;
