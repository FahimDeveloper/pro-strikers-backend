import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AddonServices } from './addon.services';

const createAddon = catchAsync(async (req, res) => {
  const files = req.files;
  await AddonServices.createAddonIntoDB(req.body, files);
  sendResponse(res, httpStatus.CREATED, 'Addon created successfully');
});

const getAllAddons = catchAsync(async (req, res) => {
  const { result, count } = await AddonServices.getAllAddonsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Addons fetched successfully',
    result,
    count,
  );
});

const getSingleAddon = catchAsync(async (req, res) => {
  const result = await AddonServices.getSingleAddonFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Addon fetched successfully', result);
});

const getSportAddons = catchAsync(async (req, res) => {
  console.log('hello');
  const result = await AddonServices.getSportAddonsFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Addons fetched successfully', result);
});

const updateAddon = catchAsync(async (req, res) => {
  const files = req.files;
  await AddonServices.updateAddonIntoDB(req.params.id, req.body, files);
  sendResponse(res, httpStatus.OK, 'Addon updated successfully');
});

const deleteAddon = catchAsync(async (req, res) => {
  await AddonServices.deleteAddonFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Addon deleted successfully');
});

export const AddonControllers = {
  createAddon,
  getAllAddons,
  getSingleAddon,
  updateAddon,
  getSportAddons,
  deleteAddon,
};
