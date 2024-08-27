import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentOneOnOneReservationController } from './appointmentOneOnOneReservation.controller';
import { AppointmentOneOnOneReservationValidations } from './appointmentOneOnOneReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReservationController.getAllAppointmentOneOnOneReservations,
);

route.get(
  '/slots',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReservationController.getAppointmentOneOnOneReservationSlots,
);

route.get(
  '/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReservationController.getSingleAppointmentOneOnOneReservation,
);

route.post(
  '/create/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentOneOnOneReservationValidations.createValidation),
  AppointmentOneOnOneReservationController.createAppointmentOneOnOneReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentOneOnOneReservationValidations.updateValidation),
  AppointmentOneOnOneReservationController.updateAppointmentOneOnOneReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReservationController.deleteAppointmentOneOnOneReservation,
);

export const AppointmentOneOnOneReservationRoutes = route;
