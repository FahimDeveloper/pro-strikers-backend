import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BrandServices } from './brand.services';

const createBrand = catchAsync(async (req, res) => {
  const file = req.file;
  await BrandServices.createBrandIntoDB(req.body, file);
  sendResponse(res, httpStatus.CREATED, 'Brand created successfully');
});

const updateBrand = catchAsync(async (req, res) => {
  const file = req.file;
  await BrandServices.updateBrandIntoDB(req.params.id, req.body, file);
  sendResponse(res, httpStatus.CREATED, 'Brand updated successfully');
});

const getBrandsByCategory = catchAsync(async (req, res) => {
  const result = await BrandServices.getBrandsByCategoryFromDB(
    req.params.category,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Category brand fetched successfully',
    result,
  );
});

const getAllBrands = catchAsync(async (req, res) => {
  const { result, count } = await BrandServices.getAllBrandsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Brands fetched successfully',
    result,
    count,
  );
});

const getSingleBrand = catchAsync(async (req, res) => {
  const result = await BrandServices.getSingleBrandFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Brand fetched successfully', result);
});

const deleteBrand = catchAsync(async (req, res) => {
  const result = await BrandServices.deleteBrandFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Brands deleted successfully', result);
});

export const BrandControllers = {
  createBrand,
  updateBrand,
  getAllBrands,
  getBrandsByCategory,
  getSingleBrand,
  deleteBrand,
};
