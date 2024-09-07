import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentGroupReservationValidations } from './appointmentGroupReservation.validation';
import { AppointmentGroupReservationController } from './appointmentGroupReservation.controller';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.getAllAppointmentGroupReservation,
);

route.get(
  '/user/:email',
  authMiddleware(ROLE.user),
  AppointmentGroupReservationController.getUserAppointmentGroupReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.getSingleAppointmentGroupReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(
    AppointmentGroupReservationValidations.createByUserValidation,
  ),
  AppointmentGroupReservationController.createAppointmentGroupReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(
    AppointmentGroupReservationValidations.createByAdminValidation,
  ),
  AppointmentGroupReservationController.createAppointmentGroupReservation,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(
    AppointmentGroupReservationValidations.updateByAdminValidation,
  ),
  AppointmentGroupReservationController.updateAppointmentGroupReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReservationController.deleteAppointmentGroupReservation,
);

export const AppointmentGroupReservationRoutes = route;
