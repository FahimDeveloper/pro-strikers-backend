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
  const { bundle, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await BundleCreditPackage.create([bundle], { session });
    await WebPayment.create([payment_info], { session });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Credit pack purchasing failed',
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

const getUserPurchasedBundleCreditPackagesFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  const bundleCreditPackQuery = new QueryBuilder(
    BundleCreditPackage.find({ email: email }),
    query,
  )
    .filter()
    .paginate();
  const result = await bundleCreditPackQuery?.modelQuery;
  const count = await bundleCreditPackQuery?.countTotal();
  return { result, count };
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
