import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentGroupReservationValidations } from './appointmentGroupReservation.validation';
import { AppointmentGroupReservationController } from './appointmentGroupReservation.controller';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  AppointmentGroupReservationController.getAllAppointmentGroupReservation,
);

route.get(
  '/user',
  authMiddleware(ROLE.user),
  AppointmentGroupReservationController.getUserAppointmentGroupReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  AppointmentGroupReservationController.getSingleAppointmentGroupReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(AppointmentGroupReservationValidations.createValidation),
  AppointmentGroupReservationController.createAppointmentGroupReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  validateRequest(AppointmentGroupReservationValidations.createValidation),
  AppointmentGroupReservationController.createAppointmentGroupReservationByAdmin,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  AppointmentGroupReservationController.deleteAppointmentGroupReservation,
);

export const AppointmentGroupReservationRoutes = route;
