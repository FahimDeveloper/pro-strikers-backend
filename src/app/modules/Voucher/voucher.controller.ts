import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VoucherServices } from './voucher.services';

const createVoucher = catchAsync(async (req, res) => {
  await VoucherServices.createVoucherIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Voucher created succesfully');
});

const getAllVouchers = catchAsync(async (req, res) => {
  const { result, count } = await VoucherServices.getAllVouchersFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Vouchers fetch succesfully', result, count);
});

const getSingleVoucher = catchAsync(async (req, res) => {
  const result = await VoucherServices.getSingleVoucherFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Voucher fetch succesfully', result);
});

const updateVoucher = catchAsync(async (req, res) => {
  await VoucherServices.updateVoucherIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Voucher updated succesfully');
});

const getVoucher = catchAsync(async (req, res) => {
  const result = await VoucherServices.getVoucherFromDB(req.body);
  sendResponse(res, httpStatus.OK, 'Get voucher succesfully', result);
});

const deleteVoucher = catchAsync(async (req, res) => {
  await VoucherServices.deleteVoucherFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Voucher deleted succesfully');
});

export const VoucherControllers = {
  createVoucher,
  getAllVouchers,
  getSingleVoucher,
  updateVoucher,
  getVoucher,
  deleteVoucher,
};
