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
  '/user/:email',
  authMiddleware(ROLE.user),
  CourseReservationController.getUserCourseReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.getSingleCourseReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(courseReservationValidations.createByUserValidation),
  CourseReservationController.createCourseReservationByUser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(courseReservationValidations.createByAdminValidation),
  CourseReservationController.createCourseReservation,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(courseReservationValidations.updateByAdminValidation),
  CourseReservationController.updateCourseReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReservationController.deleteCourseReservation,
);

export const CourseReservationRoutes = route;
