import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainerReportService } from './trainerReport.services';

const trainerReport = catchAsync(async (req, res) => {
  const result = await TrainerReportService.trainerReportFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Report successfully collected', result);
});

export const TrainerReportController = {
  trainerReport,
};
