import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IVoucher } from './voucher.interface';
import { Voucher } from './voucher.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createVoucherIntoDB = async (payload: IVoucher) => {
  const result = await Voucher.create(payload);
  return result;
};

const updateVoucherIntoDB = async (id: string, payload: IVoucher) => {
  const result = await Voucher.findByIdAndUpdate(id, payload);
  return result;
};

const getAllVouchersFromDB = async (query: Record<string, unknown>) => {
  const voucherQuery = new QueryBuilder(Voucher.find(), query)
    .search(['voucher_code'])
    .filter()
    .paginate();
  const result = await voucherQuery?.modelQuery;
  const count = await voucherQuery?.countTotal();
  return { result, count };
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
    if (
      result?.voucher_type !== payload.voucher_type &&
      result?.voucher_type !== 'general'
    ) {
      throw new AppError(httpStatus.NOT_FOUND, 'voucher not found');
    } else if (currentDate > endDate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The voucher already expired');
    } else {
      await Voucher.findByIdAndUpdate(
        result._id,
        { $inc: { used: 1 } },
        { new: true, runValidators: true },
      );
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
