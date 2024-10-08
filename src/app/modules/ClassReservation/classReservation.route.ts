import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { ClassReservationController } from './classReservation.controller';
import { ClassReservationValidations } from './classReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReservationController.getAllClassesReservation,
);

route.get(
  '/user',
  authMiddleware(ROLE.user),
  ClassReservationController.getUserClassReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReservationController.getSingleClassReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(ClassReservationValidations.createByUserValidation),
  ClassReservationController.createClassReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassReservationValidations.createByAdminValidation),
  ClassReservationController.createClassReservation,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassReservationValidations.updateByAdminValidation),
  ClassReservationController.updateClassReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReservationController.deleteClassReservation,
);

export const ClassReservationRoutes = route;
