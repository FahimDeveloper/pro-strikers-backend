import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { NotificationControllers } from './notification.controllers';

const router = express.Router();

router.get(
  '/',
  authMiddleware(ROLE.superAdmin),
  NotificationControllers.getNotification,
);

export const NotificationRoute = router;
