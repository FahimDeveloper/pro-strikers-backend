import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { CourseReservationController } from './coursesReservation.controller';
import { courseReservationValidations } from './coursesReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  CourseReservationController.getAllCoursesReservation,
);

route.get(
  '/user',
  authMiddleware(ROLE.user),
  CourseReservationController.getUserCourseReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer),
  CourseReservationController.getSingleCourseReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(courseReservationValidations.createValidation),
  CourseReservationController.createCourseReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(courseReservationValidations.createValidation),
  CourseReservationController.createCourseReservationByAdmin,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.deleteCourseReservation,
);

export const CourseReservationRoutes = route;
