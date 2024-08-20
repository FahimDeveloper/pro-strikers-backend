import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { CourseReservationController } from './coursesReservation.controller';
import { courseReservationValidations } from './coursesReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.getAllCoursesReservation,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.getSingleCourseReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  validateRequest(courseReservationValidations.createValidation),
  CourseReservationController.createCourseReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(courseReservationValidations.updateValidation),
  CourseReservationController.updateCourseReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.deleteCourseReservation,
);

export const CourseReservationRoutes = route;
