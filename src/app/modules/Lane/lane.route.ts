import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { LaneControllers } from './lane.controller';
import { LaneValidations } from './lane.validation';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get('/', LaneControllers.getAllLanes);
route.get(
  '/lane-title',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  LaneControllers.getLanes,
);
route.get('/:id', LaneControllers.getSingleLane);
route.post(
  '/create',
  upload.array('image'),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(LaneValidations.createValidation),
  LaneControllers.createLane,
);
route.patch(
  '/update/:id',
  upload.array('image'),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(LaneValidations.updateValidation),
  LaneControllers.updateLane,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  LaneControllers.deleteLane,
);

export const LaneRoutes = route;
