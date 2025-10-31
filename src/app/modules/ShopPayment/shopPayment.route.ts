import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { ShopPaymentValidations } from './shopPayment.validations';
import { ShopPaymentControllers } from './shopPayment.controllers';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  ShopPaymentControllers.getShopPaymentList,
);

route.get(
  '/:email',
  //authMiddleware(ROLE.user),
  ShopPaymentControllers.getUserShopPaymentList,
);

route.post(
  '/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ShopPaymentValidations.createValidation),
  ShopPaymentControllers.createShopPayment,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(ShopPaymentValidations.updateValidation),
  ShopPaymentControllers.updateShopPayment,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  ShopPaymentControllers.deleteShopPayment,
);

export const ShopPaymentRoutes = route;
