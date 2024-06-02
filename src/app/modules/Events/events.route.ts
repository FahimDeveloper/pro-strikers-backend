import express, { NextFunction, Request, Response } from 'express';
import { EventControllers } from './events.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { upload } from '../../middlewares/multer.middleware';
import validateRequest from '../../middlewares/validateRequest';
import { EventValidations } from './events.validation';

const route = express.Router();

route.get('/', EventControllers.getAllEvents);
route.get('/:id', EventControllers.getSingleEvent);
route.post(
  '/create',
  upload.single('image'),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EventValidations.createValidation),
  EventControllers.createEvent,
);
route.post(
  '/update/:id',
  upload.single('image'),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(EventValidations.updateValidation),
  EventControllers.updateEvent,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  EventControllers.deleteEvent,
);

export const EventRoutes = route;
