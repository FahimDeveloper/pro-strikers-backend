import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentGroupReportServices } from './appointmentGroupReport.services';

const getReservationFrequencyByMonth = catchAsync(async (req, res) => {
  const result =
    await AppointmentGroupReportServices.getReservationFrequencyByMonthFromDB(
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
    await AppointmentGroupReportServices.getReservationRevenueByMonthFromDB(
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
    await AppointmentGroupReportServices.getReservationTopSportsByMonthFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation top Sports by month fetch succesfully',
    result,
  );
});

const getReservationTopTrainersByMonth = catchAsync(async (req, res) => {
  const result =
    await AppointmentGroupReportServices.getReservationTopTrainersByMonthFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation top trainers by month fetch succesfully',
    result,
  );
});

const getOverallBookingAnalytics = catchAsync(async (req, res) => {
  const result =
    await AppointmentGroupReportServices.getOverallBookingAnalyticsFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation Overall Details fetch succesfully',
    result,
  );
});

export const AppointmentGroupReportControllers = {
  getReservationFrequencyByMonth,
  getReservationRevenueByMonth,
  getReservationTopTrainersByMonth,
  getOverallBookingAnalytics,
  getReservationTopSportsByMonth,
};
