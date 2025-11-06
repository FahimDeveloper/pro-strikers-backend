import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrackStudentServices } from './trackStudent.services';

const attendance = catchAsync(async (req, res) => {
  const result = await TrackStudentServices.attendanceIntoDB(req.body);
  sendResponse(res, httpStatus.OK, 'Track completed', result);
});

export const TrackStudentControllers = {
  attendance,
};
