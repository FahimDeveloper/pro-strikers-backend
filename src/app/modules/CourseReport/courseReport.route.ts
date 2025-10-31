import express from 'express';
import { CourseReportControllers } from './courseReport.controllers';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';

const route = express.Router();

route.get(
  '/revenue',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReportControllers.getReservationRevenueByMonth,
);

route.get(
  '/top-sports',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReportControllers.getReservationTopSportsByMonth,
);

route.get(
  '/overall',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  CourseReportControllers.getOverallBookingAnalytics,
);

export const CourseReportsRoutes = route;
