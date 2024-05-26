import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentScheduleServices } from './appointmentSchedule.services';

const createAppointment = catchAsync(async (req, res) => {
  await AppointmentScheduleServices.createAppointmentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Appointment created succesfully');
});

const getAllAppointments = catchAsync(async (req, res) => {
  const result = await AppointmentScheduleServices.getAllAppointmentsFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const getSingleAppointment = catchAsync(async (req, res) => {
  const result = await AppointmentScheduleServices.getSingleAppointmentFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const updateAppointment = catchAsync(async (req, res) => {
  await AppointmentScheduleServices.updateAppointmentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Appointment updated succesfully');
});

const deleteAppointment = catchAsync(async (req, res) => {
  await AppointmentScheduleServices.deleteAppointmentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Appointment deleted succesfully');
});

export const AppointmentSheduleControllers = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
