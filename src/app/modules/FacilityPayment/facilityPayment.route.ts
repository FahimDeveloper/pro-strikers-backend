import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityPaymentControllers } from './facilityPayment.controllers';
import { FacilityPaymentValidations } from './facilityPayment.validations';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityPaymentControllers.getFacilityPaymentList,
);

route.get(
  '/:email',
  authMiddleware(ROLE.user),
  FacilityPaymentControllers.getUserFacilityPaymentList,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityPaymentValidations.createValidation),
  FacilityPaymentControllers.createFacilityPayment,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(FacilityPaymentValidations.updateValidation),
  FacilityPaymentControllers.updateFacilityPayment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityPaymentControllers.deleteFacilityPayment,
);

export const FacilityPaymentRoutes = route;
