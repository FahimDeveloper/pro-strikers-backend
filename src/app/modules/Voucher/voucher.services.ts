import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IVoucher } from './voucher.interface';
import { Voucher } from './voucher.model';

const createVoucherIntoDB = async (payload: IVoucher) => {
  const result = await Voucher.create(payload);
  return result;
};

const updateVoucherIntoDB = async (id: string, payload: IVoucher) => {
  const result = await Voucher.findByIdAndUpdate(id, payload);
  return result;
};

const getAllVouchersFromDB = async () => {
  const result = await Voucher.find();
  return result;
};

const getVoucherFromDB = async (payload: any) => {
  const result = await Voucher.findOne({ voucher_code: payload.voucher_code });
  if (result) {
    const endDate = new Date(result?.end_date);
    const currentDate = new Date(
      endDate.getDate(),
      endDate.getMonth(),
      endDate.getFullYear(),
    );
    if (result?.voucher_type !== payload.voucher_type) {
      throw new AppError(httpStatus.NOT_FOUND, 'voucher not found');
    } else if (currentDate > endDate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The voucher already expired');
    } else {
      const voucher = {
        discount_type: result?.discount_type,
        discount_value: result?.discount_value,
      };
      return voucher;
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'voucher not found');
  }
};

const getSingleVoucherFromDB = async (id: string) => {
  const result = await Voucher.findById(id);
  return result;
};

const deleteVoucherFromDB = async (id: string) => {
  const result = await Voucher.findByIdAndDelete(id);
  return result;
};

export const VoucherServices = {
  createVoucherIntoDB,
  updateVoucherIntoDB,
  getAllVouchersFromDB,
  getVoucherFromDB,
  getSingleVoucherFromDB,
  deleteVoucherFromDB,
};
