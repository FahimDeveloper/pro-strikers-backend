import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MembershipCancellationServices } from './membershipCancellation.services';

const getAllMembershipCancellation = catchAsync(async (req, res) => {
  const { result, count } =
    await MembershipCancellationServices.getAllMembershipCancellationFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Cancellations fetch succesfully',
    result,
    count,
  );
});

const createMembershipCancellation = catchAsync(async (req, res) => {
  await MembershipCancellationServices.createMembershipCancellationIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Cancellation created succesfully');
});

const getSingleMembershipCancellation = catchAsync(async (req, res) => {
  const result =
    await MembershipCancellationServices.getSingleMembershipCancellationFromDB(
      req.params.id,
    );
  sendResponse(res, httpStatus.OK, 'Cancellation fetch succesfully', result);
});

const updateMembershipCancellation = catchAsync(async (req, res) => {
  await MembershipCancellationServices.updateMembershipCancellationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Cancellation updated succesfully');
});

const deleteMembershipCancellation = catchAsync(async (req, res) => {
  await MembershipCancellationServices.deleteMembershipCancellationFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Cancellation deleted succesfully');
});

export const MembershipCancellationController = {
  getAllMembershipCancellation,
  createMembershipCancellation,
  getSingleMembershipCancellation,
  updateMembershipCancellation,
  deleteMembershipCancellation,
};
