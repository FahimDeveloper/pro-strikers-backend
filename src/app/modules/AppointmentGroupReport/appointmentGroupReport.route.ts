import express from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import { AppointmentGroupReportControllers } from './appointmentGroupReport.controllers';

const route = express.Router();

route.get(
  '/frequency',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReportControllers.getReservationFrequencyByMonth,
);

route.get(
  '/revenue',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReportControllers.getReservationRevenueByMonth,
);

route.get(
  '/top-trainers',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReportControllers.getReservationTopTrainersByMonth,
);

route.get(
  '/top-sports',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReportControllers.getReservationTopSportsByMonth,
);

route.get(
  '/overall',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentGroupReportControllers.getOverallBookingAnalytics,
);

export const AppointmentGroupReportsRoutes = route;
