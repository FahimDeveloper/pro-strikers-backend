import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityReservationController } from './facilityReservation.controller';
import { FacilityReservationValidations } from './facilityReservation.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReservationController.getAllFacilitiesReservation,
);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReservationController.getSingleFacilityReservation,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityReservationValidations.createValidation),
  FacilityReservationController.createFacilityReservation,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityReservationValidations.updateValidation),
  FacilityReservationController.updateFacilityReservation,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReservationController.deleteFacilityReservation,
);

export const FacilityReservationRoutes = route;
