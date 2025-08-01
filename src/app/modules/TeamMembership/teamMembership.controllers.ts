import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeamMembershipServices } from './teamMembership.services';

const createTeamMembership = catchAsync(async (req, res) => {
  const result = await TeamMembershipServices.createTeamMembershipIntoDB(
    req.body,
  );
  sendResponse(
    res,
    httpStatus.CREATED,
    'Team membership created successfully',
    result,
  );
});

const getTeamMemberships = catchAsync(async (req, res) => {
  const { count, result } =
    await TeamMembershipServices.getTeamMembershipsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Team memberships retrieved successfully',
    result,
    count,
  );
});

const updateTeamMembership = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamMembershipServices.updateTeamMembershipInDB(
    id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Team membership updated successfully',
    result,
  );
});

export const TeamMembershipControllers = {
  createTeamMembership,
  getTeamMemberships,
  updateTeamMembership,
};
