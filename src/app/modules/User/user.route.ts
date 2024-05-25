/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { UserControllers } from './user.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  UserControllers.getAllUsers,
);
route.get(
  '/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  validateRequest(UserValidations.createValidation),
  UserControllers.getSingleUser,
);
route.post('/create', UserControllers.createUser);
route.patch(
  '/update/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  validateRequest(UserValidations.updateValidation),
  UserControllers.updateUser,
);
route.delete(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  UserControllers.deleteUser,
);

export const UserRoutes = route;
