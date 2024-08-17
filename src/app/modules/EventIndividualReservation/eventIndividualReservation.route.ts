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
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventIndividualReservationController.getSingleEventIndividualReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventIndividualResrvationValidations.createValidation),
  EventIndividualReservationController.createEventIndividualReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventIndividualResrvationValidations.updateValidation),
  EventIndividualReservationController.updateEventIndividualReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventIndividualReservationController.deleteEventIndividualReservation,
);

export const EventIndividualReservationRoutes = route;
