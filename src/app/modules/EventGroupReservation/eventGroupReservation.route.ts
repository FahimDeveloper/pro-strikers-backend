import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { EventGroupReservationController } from './eventGroupReservation.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EventGroupResrvationValidations } from './eventGroupReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventGroupReservationController.getAllEventGroupReservations,
);

route.get(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventGroupReservationController.getSingleEventGroupReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  validateRequest(EventGroupResrvationValidations.createValidation),
  EventGroupReservationController.createEventGroupReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventGroupResrvationValidations.updateValidation),
  EventGroupReservationController.updateEventGroupReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventGroupReservationController.deleteEventGroupReservation,
);

export const EventGroupReservationRoutes = route;
