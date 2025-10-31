import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { BootcampPaymentValidations } from './bootcampPayment.validations';
import { BootcampPaymentControllers } from './bootcampPayment.controllers';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BootcampPaymentControllers.getBootcampPaymentList,
);

route.get(
  '/:email',
  //authMiddleware(ROLE.user),
  BootcampPaymentControllers.getUserBootcampPaymentList,
);

route.post(
  '/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(BootcampPaymentValidations.createValidation),
  BootcampPaymentControllers.createBootcampPayment,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(BootcampPaymentValidations.updateValidation),
  BootcampPaymentControllers.updateBootcampPayment,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BootcampPaymentControllers.deleteBootcampPayment,
);

export const BootcampPaymentRoutes = route;
