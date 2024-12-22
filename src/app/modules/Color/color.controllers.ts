import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ColorServices } from '../Color/color.services';

const createColor = catchAsync(async (req, res) => {
  await ColorServices.createColorIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Color created successfully');
});

const getAllColors = catchAsync(async (req, res) => {
  const { result, count } = await ColorServices.getAllColorFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Colors fetched successfully',
    result,
    count,
  );
});

const updateColor = catchAsync(async (req, res) => {
  await ColorServices.updateColorIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Color updated successfully');
});

const deleteColor = catchAsync(async (req, res) => {
  await ColorServices.deleteColorFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Color deleted successfully');
});

export const ColorControllers = {
  createColor,
  getAllColors,
  updateColor,
  deleteColor,
};
