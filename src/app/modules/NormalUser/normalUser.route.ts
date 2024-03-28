import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { NormalUserControllers } from './normalUser.controller';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  NormalUserControllers.getAllNormalUsers,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  NormalUserControllers.getSingleNormalUser,
);

export const AdminRoutes = router;
