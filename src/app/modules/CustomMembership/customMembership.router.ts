import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { CustomMembershipValidation } from './customMembership.validations';
import { CustomMembershipControllers } from './customMembership.controllers';

const router = express.Router();

router.post(
  '/create',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(CustomMembershipValidation.createValidation),
  CustomMembershipControllers.createCustomMembership,
);
router.get(
  '/',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  CustomMembershipControllers.getCustomMemberships,
);

router.get(
  '/all',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  CustomMembershipControllers.getAllCustomMembership,
);

export const CustomMembershipRoutes = router;
