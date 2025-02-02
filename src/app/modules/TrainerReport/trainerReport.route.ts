import express from 'express';
import { TrainerReportController } from './trainerReport.controllers';

const route = express.Router();

route.get('/trainer', TrainerReportController.trainerReport);

export const TrainerReportRoutes = route;
