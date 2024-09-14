import express from 'express';
import { VoucherControllers } from './voucher.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { VoucherValidations } from './voucher.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  VoucherControllers.getAllVouchers,
);
route.get(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  VoucherControllers.getSingleVoucher,
);
route.post('/use', authMiddleware(ROLE.user), VoucherControllers.getVoucher);
route.post(
  '/create',
  validateRequest(VoucherValidations.createValidation),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  VoucherControllers.createVoucher,
);
route.patch(
  '/update/:id',
  validateRequest(VoucherValidations.updateValidation),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  VoucherControllers.updateVoucher,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  VoucherControllers.deleteVoucher,
);

export const VoucherRoute = route;
