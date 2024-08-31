import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OneAppointmentScheduleServices } from './oneAppointmentSchedule.services';

const createAppointment = catchAsync(async (req, res) => {
  await OneAppointmentScheduleServices.createAppointmentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Appointment created succesfully');
});

const getAllAppointments = catchAsync(async (req, res) => {
  const { count, result } =
    await OneAppointmentScheduleServices.getAllAppointmentsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment fetch succesfully',
    result,
    count,
  );
});

const getAppointmentById = catchAsync(async (req, res) => {
  const result = await OneAppointmentScheduleServices.getAppointmentByIdFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const getSingleAppointment = catchAsync(async (req, res) => {
  const result =
    await OneAppointmentScheduleServices.getSingleAppointmentFromDB(
      req.params.id,
    );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const updateAppointment = catchAsync(async (req, res) => {
  await OneAppointmentScheduleServices.updateAppointmentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Appointment updated succesfully');
});

const deleteAppointment = catchAsync(async (req, res) => {
  await OneAppointmentScheduleServices.deleteAppointmentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Appointment deleted succesfully');
});

export const OneAppointmentSheduleControllers = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
};
