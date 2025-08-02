import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomMembershipServices } from './customMembership.services';

const createCustomMembership = catchAsync(async (req, res) => {
  const result = await CustomMembershipServices.createCustomMembershipIntoDB(
    req.body,
  );
  sendResponse(
    res,
    httpStatus.CREATED,
    'Custom membership created successfully',
  );
});

const getCustomMemberships = catchAsync(async (req, res) => {
  const { result, count } =
    await CustomMembershipServices.getCustomMembershipsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Custom memberships retrieved successfully',
    result,
    count,
  );
});

const getAllCustomMembership = catchAsync(async (req, res) => {
  const result = await CustomMembershipServices.getAllCustomMembershipFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Custom memberships retrieved successfully',
    result,
  );
});

export const CustomMembershipControllers = {
  createCustomMembership,
  getCustomMemberships,
  getAllCustomMembership,
};
