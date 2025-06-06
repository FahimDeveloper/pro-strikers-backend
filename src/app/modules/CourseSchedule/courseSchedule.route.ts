import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { CourseSheduleControllers } from './courseSchedule.controller';
import { courseScheduleValidations } from './courseSchedule.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.get('/', CourseSheduleControllers.getAllCourses);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseSheduleControllers.getSingleCourse,
);

route.post(
  '/course',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseSheduleControllers.getCourseById,
);

route.post(
  '/create',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(courseScheduleValidations.createValidation),
  CourseSheduleControllers.createCourse,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  validateRequest(courseScheduleValidations.createValidation),
  CourseSheduleControllers.updateCourse,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.trainer, ROLE.superAdmin, ROLE.admin),
  CourseSheduleControllers.deleteCourse,
);

export const CourseRoutes = route;
