import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { LaneControllers } from './lane.controller';
import { LaneValidations } from './lane.validation';

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
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(LaneValidations.createValidation),
  LaneControllers.createLane,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(LaneValidations.updateValidation),
  LaneControllers.updateLane,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  LaneControllers.deleteLane,
);

export const LaneRoutes = route;
