import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthenticationValidations } from './Authentication.validation';
import { AuthenticationControllers } from './Authentication.controller';
import { UserValidations } from '../User/user.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const router = express.Router();

router.get(
  '/forgot-password/link-verify/:token',
  AuthenticationControllers.verifyUiLink,
);

router.get('/user/verify/:token', AuthenticationControllers.emailVerify);

router.post(
  '/user/continue-social-login',
  AuthenticationControllers.continueWithSocial,
);

router.post(
  '/user/login',
  validateRequest(AuthenticationValidations.loginValidation),
  AuthenticationControllers.loginUser,
);

router.post(
  '/user/registration',
  validateRequest(UserValidations.createValidation),
  AuthenticationControllers.registerUser,
);

router.post(
  '/user/:id/change-password',
  authMiddleware(ROLE.user),
  AuthenticationControllers.changeUserPassword,
);

router.post(
  '/admin/:id/change-password',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.trainer),
  AuthenticationControllers.changeAdminPassword,
);

router.post(
  '/admin/login',
  validateRequest(AuthenticationValidations.loginValidation),
  AuthenticationControllers.loginAdmin,
);

router.post('/refresh-token', AuthenticationControllers.refreshToken);

router.post(
  '/admin/forgot-password',
  AuthenticationControllers.adminForgetPassword,
);

router.post(
  '/user/forgot-password',
  AuthenticationControllers.userForgetPassword,
);

router.post(
  '/forgot-password/send-code',
  AuthenticationControllers.sendResetCode,
);

router.post(
  '/forgot-password/code-verify',
  AuthenticationControllers.verifyResetCode,
);

router.post(
  '/admin/reset-password',
  AuthenticationControllers.resetAdminPassword,
);

router.post(
  '/user/reset-password',
  AuthenticationControllers.resetUserPassword,
);

export const AuthenticationRoutes = router;
