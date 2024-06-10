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
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReservationController.getSingleClassReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassReservationValidations.createValidation),
  ClassReservationController.createClassReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassReservationValidations.updateValidation),
  ClassReservationController.updateClassReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReservationController.deleteClassReservation,
);

export const ClassReservationRoutes = route;
