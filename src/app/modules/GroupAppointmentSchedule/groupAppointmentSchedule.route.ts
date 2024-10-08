import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { GroupAppointmentSheduleControllers } from './groupAppointmentSchedule.controller';
import validateRequest from '../../middlewares/validateRequest';
import { groupAppointmentScheduleValidations } from './groupAppointmentSchedule.validation';

const route = express.Router();

route.get('/', GroupAppointmentSheduleControllers.getAllAppointments);

route.get(
  '/by-query-date',
  GroupAppointmentSheduleControllers.getAppointmentsByQueryDate,
);

route.post(
  '/by-id-date',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(groupAppointmentScheduleValidations.idValidation),
  GroupAppointmentSheduleControllers.getAppointmentByIdDate,
);

route.get(
  '/:id',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  GroupAppointmentSheduleControllers.getSingleAppointment,
);
route.post(
  '/create',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(groupAppointmentScheduleValidations.createValidation),
  GroupAppointmentSheduleControllers.createAppointment,
);

route.post(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  GroupAppointmentSheduleControllers.getAppointmentById,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(groupAppointmentScheduleValidations.updateValidation),
  GroupAppointmentSheduleControllers.updateAppointment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  GroupAppointmentSheduleControllers.deleteAppointment,
);

export const GroupAppointmentRoutes = route;
