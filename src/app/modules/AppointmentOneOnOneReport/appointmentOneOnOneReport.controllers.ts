import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentOneOnOneReportServices } from './appointmentOneOnOneReport.services';

const getReservationFrequencyByMonth = catchAsync(async (req, res) => {
  const result =
    await AppointmentOneOnOneReportServices.getReservationFrequencyByMonthFromDB(
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
    await AppointmentOneOnOneReportServices.getReservationRevenueByMonthFromDB(
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
    await AppointmentOneOnOneReportServices.getReservationTopSportsByMonthFromDB(
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
  const result =
    await AppointmentOneOnOneReportServices.getOverallBookingAnalyticsFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation Overall Details fetch succesfully',
    result,
  );
});

const getReservationTopTrainersByMonth = catchAsync(async (req, res) => {
  const result =
    await AppointmentOneOnOneReportServices.getReservationTopTrainersByMonthFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Reservation top trainers by month fetch succesfully',
    result,
  );
});

export const AppointmentOneOnOneReportControllers = {
  getReservationFrequencyByMonth,
  getReservationRevenueByMonth,
  getReservationTopSportsByMonth,
  getOverallBookingAnalytics,
  getReservationTopTrainersByMonth,
};
