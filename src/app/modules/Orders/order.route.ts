import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.getAllOrders,
);

route.get('/:email', authMiddleware(ROLE.user), OrderControllers.getUserOrders);

route.get(
  '/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.getSingleOrder,
);
route.post(
  '/create',
  //authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  validateRequest(OrderValidations.createValidation),
  OrderControllers.createOrder,
);
route.patch(
  '/update/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(OrderValidations.updateValidation),
  OrderControllers.updateOrder,
);
route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.deleteOrder,
);

route.patch(
  '/:id/admin/cancel',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.cancelOrderByAdmin,
);

route.patch(
  '/:id/cancel',
  //authMiddleware(ROLE.user),
  OrderControllers.cancelOrderByUser,
);

export const OrderRoutes = route;
