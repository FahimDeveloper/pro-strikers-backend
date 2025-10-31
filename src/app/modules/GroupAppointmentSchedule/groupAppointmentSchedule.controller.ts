import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GroupAppointmentScheduleServices } from './groupAppointmentSchedule.services';

const createAppointment = catchAsync(async (req, res) => {
  await GroupAppointmentScheduleServices.createAppointmentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Appointment created succesfully');
});

const getAllAppointments = catchAsync(async (req, res) => {
  const { count, result } =
    await GroupAppointmentScheduleServices.getAllAppointmentsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment fetch succesfully',
    result,
    count,
  );
});

const getAcademyAllAppointments = catchAsync(async (req, res) => {
  const { count, result } =
    await GroupAppointmentScheduleServices.getAcademyAllOwnAppointmentsFromDB(
      req.params.academy,
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment fetch succesfully',
    result,
    count,
  );
});

const getAppointmentById = catchAsync(async (req, res) => {
  const result =
    await GroupAppointmentScheduleServices.getAppointmentByIdFromDB(
      req.params.id,
    );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const getAppointmentsByQueryDate = catchAsync(async (req, res) => {
  const result =
    await GroupAppointmentScheduleServices.getAppointmentsByQueryDateFromDB(
      req.query,
    );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const getAppointmentByIdDate = catchAsync(async (req, res) => {
  const result =
    await GroupAppointmentScheduleServices.getAppointmentByIdDateFromDB(
      req.body,
    );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const getSingleAppointment = catchAsync(async (req, res) => {
  const result =
    await GroupAppointmentScheduleServices.getSingleAppointmentFromDB(
      req.params.id,
    );
  sendResponse(res, httpStatus.OK, 'Appointment fetch succesfully', result);
});

const updateAppointment = catchAsync(async (req, res) => {
  await GroupAppointmentScheduleServices.updateAppointmentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Appointment updated succesfully');
});

const deleteAppointment = catchAsync(async (req, res) => {
  await GroupAppointmentScheduleServices.deleteAppointmentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Appointment deleted succesfully');
});

export const GroupAppointmentSheduleControllers = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByQueryDate,
  getAppointmentByIdDate,
  getAcademyAllAppointments,
};
