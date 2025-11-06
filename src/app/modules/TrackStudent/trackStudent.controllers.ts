import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrackStudentServices } from './trackStudent.services';

const attendance = catchAsync(async (req, res) => {
  const result = await TrackStudentServices.attendanceIntoDB(req.body);
  sendResponse(res, httpStatus.OK, 'Track completed', result);
});

const getUserAllAttendance = catchAsync(async (req, res) => {
  const { result, count } =
    await TrackStudentServices.getUserAllAttendanceFromDB(
      req.query,
      req.params.email,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Student Track list fetch successfully',
    result,
    count,
  );
});

export const TrackStudentControllers = {
  attendance,
  getUserAllAttendance,
};
