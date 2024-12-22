import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BundleCreditPackageServices } from './bundleCreditPack.services';

const purchaseBundleCreditPackage = catchAsync(async (req, res) => {
  await BundleCreditPackageServices.purchaseBundleCreditPackageIntoDB(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    'Bundle Cage pack purchased Successfully',
  );
});

const getAllPurchasedBundleCreditPackages = catchAsync(async (req, res) => {
  const { count, result } =
    await BundleCreditPackageServices.getAllPurchsaedBundleCreditPackageFromDB(
      req.query,
    );
  sendResponse(res, httpStatus.OK, 'All bundle credit packs', result, count);
});

const updateUseCreditPackage = catchAsync(async (req, res) => {
  await BundleCreditPackageServices.updateUseCreditPackageIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Use credit package updated successfully');
});

const getUserPurchasedBundleCreditPackages = catchAsync(async (req, res) => {
  const result =
    await BundleCreditPackageServices.getUserPurchasedBundleCreditPackagesFromDB(
      req.params.email,
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'User purchased bundle credit packages',
    result,
  );
});

export const BundleCreditPackageControllers = {
  purchaseBundleCreditPackage,
  updateUseCreditPackage,
  getAllPurchasedBundleCreditPackages,
  getUserPurchasedBundleCreditPackages,
};
