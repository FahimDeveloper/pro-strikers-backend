import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { OneAppointmentSheduleControllers } from './oneAppointmentSchedule.controller';
import validateRequest from '../../middlewares/validateRequest';
import { oneAppointmentScheduleValidations } from './oneAppointmentSchedule.validation';

const route = express.Router();

route.get('/', OneAppointmentSheduleControllers.getAllAppointments);

route.get('/:id', OneAppointmentSheduleControllers.getSingleAppointment);

route.post(
  '/create',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(oneAppointmentScheduleValidations.createValidation),
  OneAppointmentSheduleControllers.createAppointment,
);
route.post(
  '/appointment',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(oneAppointmentScheduleValidations.idValidation),
  OneAppointmentSheduleControllers.getAppointmentById,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(oneAppointmentScheduleValidations.updateValidation),
  OneAppointmentSheduleControllers.updateAppointment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  OneAppointmentSheduleControllers.deleteAppointment,
);

export const OneAppointmentRoutes = route;
