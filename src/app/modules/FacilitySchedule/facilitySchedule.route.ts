import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { FacilitySheduleControllers } from './facilitySchedule.controller';
import { facilityScheduleValidations } from './facilitySchedule.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilitySheduleControllers.getAllFacilities,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilitySheduleControllers.getSingleFacility,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(facilityScheduleValidations.createValidation),
  FacilitySheduleControllers.createFacility,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(facilityScheduleValidations.createValidation),
  FacilitySheduleControllers.updateFacility,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilitySheduleControllers.deleteFacility,
);

export const FacilityRoutes = route;
