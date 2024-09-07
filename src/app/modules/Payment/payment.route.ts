import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { PaymentControllers } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidations } from './payment.validations';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  PaymentControllers.getPaymentList,
);

route.get(
  '/:userId',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  PaymentControllers.getUserPaymentList,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(PaymentValidations.createValidation),
  PaymentControllers.createPayment,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(PaymentValidations.updateValidation),
  PaymentControllers.updatePayment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  PaymentControllers.deletePayment,
);

export const PaymentRoutes = route;
