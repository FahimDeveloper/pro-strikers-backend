import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { ClassReservationController } from './classReservation.controller';
import { ClassReservationValidations } from './classReservation.validation';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  ClassReservationController.getAllClassesReservation,
);
route.get(
  '/academy/:academy',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  ClassReservationController.getAcademyAllOwnClassesReservation,
);

route.get(
  '/user',
  //authMiddleware(ROLE.user),
  ClassReservationController.getUserClassReservationList,
);

route.get(
  '/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  ClassReservationController.getSingleClassReservation,
);

route.post(
  '/user/create',
  //authMiddleware(ROLE.user),
  validateRequest(ClassReservationValidations.createValidation),
  ClassReservationController.createClassReservationByUser,
);

route.post(
  '/admin/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  validateRequest(ClassReservationValidations.createValidation),
  ClassReservationController.createClassReservationByAdmin,
);

route.delete(
  '/admin/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.trainer, ROLE.academy),
  ClassReservationController.deleteClassReservation,
);

export const ClassReservationRoutes = route;
