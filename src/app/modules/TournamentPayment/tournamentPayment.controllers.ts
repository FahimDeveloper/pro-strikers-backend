import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TournamentPaymentServices } from './tournamentPayment.services';

const createTournamentPayment = catchAsync(async (req, res) => {
  const result = await TournamentPaymentServices.createTournamentPaymentIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getTournamentPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await TournamentPaymentServices.getTournamentPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserTournamentPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await TournamentPaymentServices.getUserTournamentPaymentListFormDB(
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

const updateTournamentPayment = catchAsync(async (req, res) => {
  const result = await TournamentPaymentServices.updateTournamentPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteTournamentPayment = catchAsync(async (req, res) => {
  await TournamentPaymentServices.deleteTournamentPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const TournamentPaymentControllers = {
  createTournamentPayment,
  updateTournamentPayment,
  deleteTournamentPayment,
  getTournamentPaymentList,
  getUserTournamentPaymentList,
};
