import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { ClassPaymentValidations } from './classPayment.validations';
import { ClassPaymentControllers } from './classPayment.controllers';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassPaymentControllers.getClassPaymentList,
);

route.get(
  '/:email',
  authMiddleware(ROLE.user),
  ClassPaymentControllers.getUserClassPaymentList,
);

route.post(
  '/create',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassPaymentValidations.createValidation),
  ClassPaymentControllers.createClassPayment,
);

route.patch(
  '/update/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ClassPaymentValidations.updateValidation),
  ClassPaymentControllers.updateClassPayment,
);

route.delete(
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassPaymentControllers.deleteClassPayment,
);

export const ClassPaymentRoutes = route;
