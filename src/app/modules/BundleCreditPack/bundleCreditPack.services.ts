import mongoose from 'mongoose';
import {
  IAttendance,
  IBundleCreditPackPurchase,
} from './bundleCreditPack.interface';
import { BundleCreditPackage } from './bundleCreditPack.model';
import WebPayment from '../WebPayment/webPayment.modal';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

const purchaseBundleCreditPackageIntoDB = async (
  payload: IBundleCreditPackPurchase,
) => {
  const session = await mongoose.startSession();
  const { bundle, payment_info } = payload;
  try {
    session.startTransaction();
    await BundleCreditPackage.create([bundle], { session });
    await WebPayment.create([payment_info], { session });
    session.commitTransaction();
    session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Appointment registration failed',
    );
  }
};

const getAllPurchsaedBundleCreditPackageFromDB = async (
  query: Record<string, unknown>,
) => {
  const bundleCreditPackQuery = new QueryBuilder(
    BundleCreditPackage.find(),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await bundleCreditPackQuery?.modelQuery;
  const count = await bundleCreditPackQuery?.countTotal();
  return { result, count };
};

const getUserPurchasedBundleCreditPackagesFromDB = async (email: string) => {
  const result = await BundleCreditPackage.find({ email: email });
  return result;
};

const updateUseCreditPackageIntoDB = async (
  id: string,
  payload: IAttendance,
) => {
  const result = await BundleCreditPackage.findByIdAndUpdate(id, payload);
  return result;
};

export const BundleCreditPackageServices = {
  getAllPurchsaedBundleCreditPackageFromDB,
  getUserPurchasedBundleCreditPackagesFromDB,
  purchaseBundleCreditPackageIntoDB,
  updateUseCreditPackageIntoDB,
};
