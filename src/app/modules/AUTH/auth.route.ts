import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidations } from '../User/user.validation';

const router = express.Router();

router.post(
  '/user/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginUser,
);

router.post(
  '/user/registration',
  validateRequest(UserValidations.createValidation),
  AuthControllers.registerUser,
);

router.post(
  '/admin/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginAdmin,
);

router.post('/refresh-token', AuthControllers.refreshToken);

router.post('/admin/forgot-password', AuthControllers.adminForgetPassword);

router.post('/user/forgot-password', AuthControllers.userForgetPassword);

router.post('/forgot-password/send-code', AuthControllers.sendResetCode);

router.get('/forgot-password/link-verify/:token', AuthControllers.verifyUiLink);

router.post('/forgot-password/code-verify', AuthControllers.verifyResetCode);

router.post('/admin/reset-password', AuthControllers.resetAdminPassword);

router.post('/user/reset-password', AuthControllers.resetUserPassword);

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
