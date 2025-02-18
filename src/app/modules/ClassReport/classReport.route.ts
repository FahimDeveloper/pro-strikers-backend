import express from 'express';
import { ClassReportControllers } from './classReport.controllers';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';

const route = express.Router();

route.get(
  '/frequency',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReportControllers.getReservationFrequencyByMonth,
);

route.get(
  '/revenue',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReportControllers.getReservationRevenueByMonth,
);

route.get(
  '/top-sports',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReportControllers.getReservationTopSportsByMonth,
);

route.get(
  '/overall',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ClassReportControllers.getOverallBookingAnalytics,
);

export const ClassReportsRoutes = route;
