import express from 'express';
import { AdminControllers } from './admin.controller';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from './admin.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.getAllAdminUsers,
);

route.get('/trainers', AdminControllers.getAllTrainers);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.getSingleAdminUser,
);

route.post(
  '/create',
  validateRequest(adminValidations.createValidation),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.createAdminUser,
);

route.patch(
  '/update/:id',
  validateRequest(adminValidations.createValidation),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.updateAdminUser,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.deleteAdminUser,
);

export const AdminRoutes = route;
