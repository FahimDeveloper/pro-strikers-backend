import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentOneOnOneReservationController } from './appointmentOneOnOneReservation.controller';
import { AppointmentOneOnOneReservationValidations } from './appointmentOneOnOneReservation.validation';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  AppointmentOneOnOneReservationController.getAllAppointmentOneOnOneReservations,
);

route.get(
  '/academy/:academy',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  AppointmentOneOnOneReservationController.getAcademyAllOwnAppointmentOneOnOneReservations,
);

route.get(
  '/slots',
  AppointmentOneOnOneReservationController.getAppointmentOneOnOneReservationSlots,
);

route.get(
  '/user',
  //authMiddleware(ROLE.user),
  AppointmentOneOnOneReservationController.getUserAppointmentOneOnOneReservationList,
);

route.get(
  '/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  AppointmentOneOnOneReservationController.getSingleAppointmentOneOnOneReservation,
);

route.post(
  '/admin/create/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  validateRequest(AppointmentOneOnOneReservationValidations.createValidation),
  AppointmentOneOnOneReservationController.createAppointmentOneOnOneReservation,
);

route.post(
  '/user/create/:id',
  //authMiddleware(ROLE.user),
  validateRequest(AppointmentOneOnOneReservationValidations.createValidation),
  AppointmentOneOnOneReservationController.createAppointmentOneOnOneReservationByUser,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  AppointmentOneOnOneReservationController.deleteAppointmentOneOnOneReservation,
);

export const AppointmentOneOnOneReservationRoutes = route;
