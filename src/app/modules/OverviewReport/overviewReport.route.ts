import express from 'express';
import { OverviewReportController } from './overviewReport.controllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const route = express.Router();

route.get(
  '/trainer',
  //authMiddleware(ROLE.trainer),
  OverviewReportController.trainerOverviewReport,
);

route.get(
  '/admin',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.academy),
  OverviewReportController.adminOverviewReport,
);

route.get(
  '/academy/:academy',
  //authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.academy),
  OverviewReportController.academyOverviewFromDB,
);

export const OverviewReportRoutes = route;
