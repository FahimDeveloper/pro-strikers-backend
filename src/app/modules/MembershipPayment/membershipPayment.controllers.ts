import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MembershipPaymentServices } from './membershipPayment.services';

const createMembershipPayment = catchAsync(async (req, res) => {
  const result = await MembershipPaymentServices.createMembershipPaymentIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getMembershipPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await MembershipPaymentServices.getMembershipPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserMembershipPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await MembershipPaymentServices.getUserMembershipPaymentListFormDB(
      req.query,
      req.params.email,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Payment List fetched successfully',
    result,
    count,
  );
});

const updateMembershipPayment = catchAsync(async (req, res) => {
  const result = await MembershipPaymentServices.updateMembershipPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteMembershipPayment = catchAsync(async (req, res) => {
  await MembershipPaymentServices.deleteMembershipPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const MembershipPaymentControllers = {
  createMembershipPayment,
  updateMembershipPayment,
  deleteMembershipPayment,
  getMembershipPaymentList,
  getUserMembershipPaymentList,
};
