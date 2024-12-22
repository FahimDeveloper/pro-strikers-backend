import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SizeServices } from './size.services';

const createSize = catchAsync(async (req, res) => {
  const result = await SizeServices.createSizeIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Size created successfully', result);
});

const getAllSizes = catchAsync(async (req, res) => {
  const { result, count } = await SizeServices.getAllSizeFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Sizes fetched successfully', result, count);
});

const updateSize = catchAsync(async (req, res) => {
  const result = await SizeServices.updateSizeIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Size updated successfully', result);
});

const deleteSize = catchAsync(async (req, res) => {
  await SizeServices.deleteSizeFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Size deleted successfully');
});

export const SizeControllers = {
  createSize,
  getAllSizes,
  updateSize,
  deleteSize,
};
