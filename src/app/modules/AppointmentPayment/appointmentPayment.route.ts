import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentPaymentValidations } from './appointmentPayment.validations';
import { AppointmentPaymentControllers } from './appointmentPayment.controllers';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentPaymentControllers.getAppointmentPaymentList,
);

route.get(
  '/:email',
  //authMiddleware(ROLE.user),
  AppointmentPaymentControllers.getUserAppointmentPaymentList,
);

route.post(
  '/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentPaymentValidations.createValidation),
  AppointmentPaymentControllers.createAppointmentPayment,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(AppointmentPaymentValidations.updateValidation),
  AppointmentPaymentControllers.updateAppointmentPayment,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentPaymentControllers.deleteAppointmentPayment,
);

export const AppointmentPaymentRoutes = route;
