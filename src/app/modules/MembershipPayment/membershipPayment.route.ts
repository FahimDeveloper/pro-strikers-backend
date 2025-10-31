import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { MembershipPaymentControllers } from './membershipPayment.controllers';
import { MembershipPaymentValidations } from './membershipPayment.validations';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  MembershipPaymentControllers.getMembershipPaymentList,
);

route.get(
  '/:email',
  //authMiddleware(ROLE.user),
  MembershipPaymentControllers.getUserMembershipPaymentList,
);

route.post(
  '/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(MembershipPaymentValidations.createValidation),
  MembershipPaymentControllers.createMembershipPayment,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(MembershipPaymentValidations.updateValidation),
  MembershipPaymentControllers.updateMembershipPayment,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  MembershipPaymentControllers.deleteMembershipPayment,
);

export const MembershipPaymentRoutes = route;
