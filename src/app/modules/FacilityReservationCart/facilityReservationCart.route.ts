import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityReservationCartController } from './facilityReservationCart.controller';
import { FacilityCartReservationValidations } from './facilityReservationCart.validation';

const router = express.Router();

router.get(
  '/',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  FacilityReservationCartController.getFacilityReservationCartByUserAndDate,
);

router.post(
  '/create',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  validateRequest(FacilityCartReservationValidations.createValidation),
  FacilityReservationCartController.createFacilityReservationCart,
);

router.delete(
  '/delete/single/:id',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  FacilityReservationCartController.deleteSingleFacilityReservationCart,
);

router.delete(
  '/delete/all/:userId',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  FacilityReservationCartController.deleteUserFacilityReservationCart,
);

export const FacilityReservationCartRoutes = router;
