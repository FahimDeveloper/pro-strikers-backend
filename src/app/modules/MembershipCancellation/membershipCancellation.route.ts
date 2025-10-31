import express from 'express';
import { MembershipCancellationController } from './membershipCancellation.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { MembershipCancellationValidation } from './membershipCancellation.validation';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  MembershipCancellationController.getAllMembershipCancellation,
);

route.get(
  '/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  MembershipCancellationController.getSingleMembershipCancellation,
);

route.get(
  '/user/:email',
  //authMiddleware(ROLE.user),
  MembershipCancellationController.getMembershipCancellationByEmail,
);

route.post(
  '/create',
  //authMiddleware(ROLE.user),
  validateRequest(MembershipCancellationValidation.createValidation),
  MembershipCancellationController.createMembershipCancellation,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(MembershipCancellationValidation.updateValidation),
  MembershipCancellationController.updateMembershipCancellation,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  MembershipCancellationController.deleteMembershipCancellation,
);

export const MembershipCancellationRoutes = route;
