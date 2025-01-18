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
  '/user',
  authMiddleware(ROLE.user),
  EventGroupReservationController.getUserEventGroupReservationList,
);

route.get(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventGroupReservationController.getSingleEventGroupReservation,
);

route.post(
  '/user/create',
  authMiddleware(ROLE.user),
  validateRequest(EventGroupResrvationValidations.createValidation),
  EventGroupReservationController.createEventGroupReservationByuser,
);

route.post(
  '/admin/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventGroupResrvationValidations.createValidation),
  EventGroupReservationController.createEventGroupReservationByAdmin,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(EventGroupResrvationValidations.updateByAdminValidation),
  EventGroupReservationController.updateEventGroupReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventGroupReservationController.deleteEventGroupReservation,
);

export const EventGroupReservationRoutes = route;
