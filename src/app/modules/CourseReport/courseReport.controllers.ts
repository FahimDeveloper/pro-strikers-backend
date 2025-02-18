import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseReportServices } from './courseReport.services';

const getReservationRevenueByMonth = catchAsync(async (req, res) => {
  const result = await CourseReportServices.getReservationRevenueByMonthFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation revenue by month fetch succesfully',
    result,
  );
});

const getReservationTopSportsByMonth = catchAsync(async (req, res) => {
  const result =
    await CourseReportServices.getReservationTopSportsByMonthFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation top sports by month fetch succesfully',
    result,
  );
});

const getOverallBookingAnalytics = catchAsync(async (req, res) => {
  const result = await CourseReportServices.getOverallBookingAnalyticsFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation Overall Details fetch succesfully',
    result,
  );
});

export const CourseReportControllers = {
  getReservationRevenueByMonth,
  getReservationTopSportsByMonth,
  getOverallBookingAnalytics,
};
