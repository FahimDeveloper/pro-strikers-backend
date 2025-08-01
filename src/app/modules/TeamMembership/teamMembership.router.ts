import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TeamMembershipValidation } from './teamMembership.validations';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { TeamMembershipControllers } from './teamMembership.controllers';

const router = express.Router();

router.post(
  '/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(TeamMembershipValidation.createValidation),
  TeamMembershipControllers.createTeamMembership,
);

router.get(
  '/',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  TeamMembershipControllers.getTeamMemberships,
);

router.patch(
  '/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(TeamMembershipValidation.updateValidation),
  TeamMembershipControllers.updateTeamMembership,
);

export const TeamMembershipRouter = router;
