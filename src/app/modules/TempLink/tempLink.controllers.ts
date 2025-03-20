import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TempLinkServices } from './tempLink.services';

const createTempLink = catchAsync(async (req, res) => {
  const result = await TempLinkServices.createTempLinkIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Link created successfully', result);
});

const getTempLink = catchAsync(async (req, res) => {
  const result = await TempLinkServices.getTempLinkFromDB(req.params.id);
  sendResponse(res, httpStatus.CREATED, 'Link fetched successfully', result);
});

export const TempLinkControllers = {
  createTempLink,
  getTempLink,
};
