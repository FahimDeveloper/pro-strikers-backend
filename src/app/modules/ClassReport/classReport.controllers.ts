import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassReportServices } from './classReport.services';

const getReservationFrequencyByMonth = catchAsync(async (req, res) => {
  const result = await ClassReportServices.getReservationFrequencyByMonthFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation frequency by month fetch succesfully',
    result,
  );
});

const getReservationRevenueByMonth = catchAsync(async (req, res) => {
  const result = await ClassReportServices.getReservationRevenueByMonthFromDB(
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
  const result = await ClassReportServices.getReservationTopSportsByMonthFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation top sports by month fetch succesfully',
    result,
  );
});

const getOverallBookingAnalytics = catchAsync(async (req, res) => {
  const result = await ClassReportServices.getOverallBookingAnalyticsFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation Overall Details fetch succesfully',
    result,
  );
});

export const ClassReportControllers = {
  getReservationFrequencyByMonth,
  getReservationRevenueByMonth,
  getReservationTopSportsByMonth,
  getOverallBookingAnalytics,
};
