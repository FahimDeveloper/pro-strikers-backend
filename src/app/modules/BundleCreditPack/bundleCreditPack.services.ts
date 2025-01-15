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
import {
  sendBundleCreditPackPurchasedConfirmationEmail,
  sendBundleCreditPurchaseFailedNotifyEmail,
} from '../../utils/email';
import FacilityPayment from '../FacilityPayment/facilityPayment.model';

const purchaseBundleCreditPackageIntoDB = async (
  payload: IBundleCreditPackPurchase,
) => {
  const { bundle, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const payment = await FacilityPayment.create([payment_info], { session });
    const createPayload = {
      ...bundle,
      payment_id: payment[0]._id,
    };
    await BundleCreditPackage.create([createPayload], { session });
    await sendBundleCreditPackPurchasedConfirmationEmail({
      email: payment_info.email,
      bundle: bundle,
      amount: payment_info.amount,
    });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error?.message);
    await sendBundleCreditPurchaseFailedNotifyEmail({
      email: payment_info.email,
      bundle: bundle,
      amount: payment_info?.amount,
      transactionId: payment_info?.transaction_id,
    });
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your Bundle Credit pack purchase was unsuccessful, but your payment went through. There was an issue with our processing. Please be patient; our customer support team will contact you as soon as possible to assist you further.',
    );
  }
};

const getAllPurchsaedBundleCreditPackageFromDB = async (
  query: Record<string, unknown>,
) => {
  const bundleCreditPackQuery = new QueryBuilder(
    BundleCreditPackage.find().populate([
      {
        path: 'user',
      },
    ]),
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
