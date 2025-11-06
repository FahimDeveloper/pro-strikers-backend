import express from 'express';
import { TrackStudentControllers } from './trackStudent.controllers';

const router = express.Router();

router.post('/track', TrackStudentControllers.attendance);

export const TrackRoutes = router;
