import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const route = express.Router();

route.get('/', OrderControllers.getAllOrders);
route.get('/:id', OrderControllers.getSingleOrder);
route.post(
  '/create',
  validateRequest(OrderValidations.createValidation),
  OrderControllers.createOrder,
);
route.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(OrderValidations.updateValidation),
  OrderControllers.updateOrder,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.deleteOrder,
);

route.patch(
  '/:id/cancel',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  OrderControllers.cancelOrder,
);

export const OrderRoutes = route;
