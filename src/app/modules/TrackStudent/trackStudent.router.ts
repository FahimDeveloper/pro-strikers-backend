import express from 'express';
import { TrackStudentControllers } from './trackStudent.controllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const router = express.Router();

router.post('/track', TrackStudentControllers.attendance);
router.get(
  '/:email',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  TrackStudentControllers.getUserAllAttendance,
);

export const TrackRoutes = router;
