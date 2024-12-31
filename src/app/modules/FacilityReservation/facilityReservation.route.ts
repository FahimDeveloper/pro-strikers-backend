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
  '/user',
  authMiddleware(ROLE.user),
  FacilityReservationController.getUserFacilitiesReservation,
);

route.get('/slots', FacilityReservationController.getFacilityReservationSlots);

route.get(
  '/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReservationController.getSingleFacilityReservation,
);

route.post(
  '/user/create/:id',
  authMiddleware(ROLE.user),
  // validateRequest(FacilityReservationValidations.createByUserValidation),
  FacilityReservationController.createFacilityReservationByUser,
);

route.post(
  '/admin/create/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityReservationValidations.createByAdminValidation),
  FacilityReservationController.createFacilityReservation,
);

route.patch(
  '/admin/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityReservationValidations.updateByAdminValidation),
  FacilityReservationController.updateFacilityReservation,
);

route.delete(
  '/admin/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReservationController.deleteFacilityReservation,
);

export const FacilityReservationRoutes = route;
