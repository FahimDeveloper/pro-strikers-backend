import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotificationServices } from './notification.services';

const getNotification = catchAsync(async (req, res) => {
  const { result, count } = await NotificationServices.getNotificationFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Notification fetched successfully',
    result,
    count,
  );
});

export const NotificationControllers = {
  getNotification,
};
