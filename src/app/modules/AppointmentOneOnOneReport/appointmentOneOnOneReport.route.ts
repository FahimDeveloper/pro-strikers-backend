import express from 'express';
import { AppointmentOneOnOneReportControllers } from './appointmentOneOnOneReport.controllers';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';

const route = express.Router();

route.get(
  '/frequency',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReportControllers.getReservationFrequencyByMonth,
);

route.get(
  '/revenue',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReportControllers.getReservationRevenueByMonth,
);

route.get(
  '/top-sports',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReportControllers.getReservationTopSportsByMonth,
);

route.get(
  '/top-trainers',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReportControllers.getReservationTopTrainersByMonth,
);

route.get(
  '/overall',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  AppointmentOneOnOneReportControllers.getOverallBookingAnalytics,
);

export const AppointmentOneOnOneReportsRoutes = route;
