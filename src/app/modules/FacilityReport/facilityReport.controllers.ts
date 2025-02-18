import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityReportServices } from './facilityReport.services';

const getReservationFrequencyByMonth = catchAsync(async (req, res) => {
  const result =
    await FacilityReportServices.getReservationFrequencyByMonthFromDB(
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
  const result =
    await FacilityReportServices.getReservationRevenueByMonthFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation revenue by month fetch succesfully',
    result,
  );
});

const getReservationLaneUtilizationByMonth = catchAsync(async (req, res) => {
  const result =
    await FacilityReportServices.getReservationLaneUtilizationByMonthFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation lane utilization by month fetch succesfully',
    result,
  );
});

const getOverallBookingAnalytics = catchAsync(async (req, res) => {
  const result =
    await FacilityReportServices.getOverallBookingAnalyticsFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation Overall Details fetch succesfully',
    result,
  );
});

export const FacilityReportControllers = {
  getReservationFrequencyByMonth,
  getReservationRevenueByMonth,
  getReservationLaneUtilizationByMonth,
  getOverallBookingAnalytics,
};
