import express from 'express';
import { EventControllers } from './events.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const route = express.Router();

route.get('/', EventControllers.getAllEvents);
route.get('/:id', EventControllers.getSingleEvent);
route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  EventControllers.createEvent,
);
route.post(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  EventControllers.updateEvent,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventControllers.deleteEvent,
);

export const EventRoutes = route;
