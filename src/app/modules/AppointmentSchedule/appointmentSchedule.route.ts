import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { AppointmentSheduleControllers } from './appointmentSchedule.controller';
import validateRequest from '../../middlewares/validateRequest';
import { appointmentScheduleValidations } from './appointmentSchedule.validation';

const route = express.Router();

route.get('/', AppointmentSheduleControllers.getAllAppointments);

route.get(
  '/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  AppointmentSheduleControllers.getSingleAppointment,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(appointmentScheduleValidations.createValidation),
  AppointmentSheduleControllers.createAppointment,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(appointmentScheduleValidations.updateValidation),
  AppointmentSheduleControllers.updateAppointment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentSheduleControllers.deleteAppointment,
);

export const AppointmentRoutes = route;
