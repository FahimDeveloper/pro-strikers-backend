import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { FacilitySheduleControllers } from './facilitySchedule.controller';
import { facilityScheduleValidations } from './facilitySchedule.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.get('/by-query', FacilitySheduleControllers.getFacilityByQuery);

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

route.post(
  '/facility',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(facilityScheduleValidations.idValidation),
  FacilitySheduleControllers.getFacilityById,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(facilityScheduleValidations.updateValidation),
  FacilitySheduleControllers.updateFacility,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilitySheduleControllers.deleteFacility,
);

export const FacilityRoutes = route;
