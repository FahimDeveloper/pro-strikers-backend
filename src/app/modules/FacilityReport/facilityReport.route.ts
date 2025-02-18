import express from 'express';
import { FacilityReportControllers } from './facilityReport.controllers';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';

const route = express.Router();

route.get(
  '/frequency',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReportControllers.getReservationFrequencyByMonth,
);

route.get(
  '/revenue',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReportControllers.getReservationRevenueByMonth,
);

route.get(
  '/lane-utilization',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReportControllers.getReservationLaneUtilizationByMonth,
);

route.get(
  '/overall',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  FacilityReportControllers.getOverallBookingAnalytics,
);

export const FacilityReportsRoutes = route;
