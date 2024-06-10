import express from 'express';
import { ClassSheduleControllers } from './classSchedule.controller';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { classScheduleValidations } from './classSchedule.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassSheduleControllers.getAllClasses,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassSheduleControllers.getSingleClass,
);

route.post(
  '/by-date',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassSheduleControllers.getClassByDate,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(classScheduleValidations.createValidation),
  ClassSheduleControllers.createClass,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(classScheduleValidations.updateValidation),
  ClassSheduleControllers.updateClass,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassSheduleControllers.deleteClass,
);

export const ClassRoutes = route;
