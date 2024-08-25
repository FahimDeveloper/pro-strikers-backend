import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { SlotBookingController } from './slotBooking.controller';
import { SlotBookingValidations } from './slotBooking.validation';

const router = express.Router();

router.get(
  '/',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  SlotBookingController.getSlotBookings,
);

router.post(
  '/create',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  validateRequest(SlotBookingValidations.createValidation),
  SlotBookingController.createSlotBooking,
);

router.delete(
  '/delete/slots',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  SlotBookingController.deleteUserSlotBookings,
);

router.delete(
  '/delete/:id',
  authMiddleware(ROLE.user, ROLE.admin, ROLE.superAdmin),
  SlotBookingController.deleteSlotBooking,
);

export const SlotRoutes = router;
