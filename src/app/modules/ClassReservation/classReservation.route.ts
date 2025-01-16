import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { ClassReservationController } from './classReservation.controller';
import { ClassReservationValidations } from './classReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  ClassReservationController.getAllClassesReservation,
);

route.get(
  '/user',
  authMiddleware(ROLE.user),
  ClassReservationController.getUserClassReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  ClassReservationController.getSingleClassReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(ClassReservationValidations.createValidation),
  ClassReservationController.createClassReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  validateRequest(ClassReservationValidations.createValidation),
  ClassReservationController.createClassReservationByAdmin,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  ClassReservationController.deleteClassReservation,
);

export const ClassReservationRoutes = route;
