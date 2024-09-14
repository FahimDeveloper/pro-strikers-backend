import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { EventIndividualReservationController } from './eventIndividualReservation.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EventIndividualResrvationValidations } from './eventIndividualReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventIndividualReservationController.getAllEventIndividualReservations,
);

route.get(
  '/user',
  authMiddleware(ROLE.user),
  EventIndividualReservationController.getUserEventIndividualReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventIndividualReservationController.getSingleEventIndividualReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(EventIndividualResrvationValidations.createByUserValidation),
  EventIndividualReservationController.createEventIndividualReservationByuser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventIndividualResrvationValidations.createByAdminValidation),
  EventIndividualReservationController.createEventIndividualReservation,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventIndividualResrvationValidations.updateByAdminValidation),
  EventIndividualReservationController.updateEventIndividualReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventIndividualReservationController.deleteEventIndividualReservation,
);

export const EventIndividualReservationRoutes = route;
