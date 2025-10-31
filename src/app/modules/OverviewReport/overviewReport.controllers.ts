import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OverviewReportService } from './overviewReport.services';

const trainerOverviewReport = catchAsync(async (req, res) => {
  const result = await OverviewReportService.trainerOverviewFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Report successfully collected', result);
});

const adminOverviewReport = catchAsync(async (req, res) => {
  const result = await OverviewReportService.adminOverviewFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Report successfully collected', result);
});

const academyOverviewFromDB = catchAsync(async (req, res) => {
  const result = await OverviewReportService.academyOverviewFromDB(
    req.params.academy,
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Report successfully collected', result);
});

export const OverviewReportController = {
  trainerOverviewReport,
  adminOverviewReport,
  academyOverviewFromDB,
};
