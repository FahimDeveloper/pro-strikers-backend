import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LaneServices } from './lane.services';

const createLane = catchAsync(async (req, res) => {
  await LaneServices.createLaneIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Lane created successfully');
});

const getAllLanes = catchAsync(async (req, res) => {
  const { result, count } = await LaneServices.getAllLanesFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Lanes fetched successfully', result, count);
});

const getSingleLane = catchAsync(async (req, res) => {
  const result = await LaneServices.getSingleLaneFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Lane fetched successfully', result);
});

const getLanes = catchAsync(async (req, res) => {
  const result = await LaneServices.getLanesFromDB();
  sendResponse(res, httpStatus.OK, 'Lanes fetched successfully', result);
});

const updateLane = catchAsync(async (req, res) => {
  await LaneServices.updateLaneIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Lane updated successfully');
});

const deleteLane = catchAsync(async (req, res) => {
  await LaneServices.deleteLaneFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Lane deleted successfully');
});

export const LaneControllers = {
  createLane,
  getAllLanes,
  getSingleLane,
  updateLane,
  getLanes,
  deleteLane,
};
