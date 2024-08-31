import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentGroupReservationValidations } from './appointmentGroupReservation.validation';
import { AppointmentGroupReservationController } from './appointmentGroupReservation.controller';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.getAllAppointmentGroupReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentGroupReservationValidations.createValidation),
  AppointmentGroupReservationController.createAppointmentGroupReservation,
);

route.get(
  '/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.getSingleAppointmentGroupReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentGroupReservationValidations.updateValidation),
  AppointmentGroupReservationController.updateAppointmentGroupReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.deleteAppointmentGroupReservation,
);

export const AppointmentGroupReservationRoutes = route;
