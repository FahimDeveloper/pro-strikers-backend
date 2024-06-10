import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StoreServices } from './store.services';

const createProduct = catchAsync(async (req, res) => {
  const files = req.files;
  await StoreServices.createProductIntoDB(req.body, files);
  sendResponse(res, httpStatus.CREATED, 'Product created succesfully');
});

const getAllProducts = catchAsync(async (req, res) => {
  const { count, result } = await StoreServices.getAllProductsFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Product fetch succesfully', result, count);
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await StoreServices.getSingleProductFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Product fetch succesfully', result);
});

const updateProduct = catchAsync(async (req, res) => {
  const files = req.files;
  await StoreServices.updateProuctIntoDB(req.params.id, req.body, files);
  sendResponse(res, httpStatus.OK, 'Product updated succesfully');
});

const deleteProduct = catchAsync(async (req, res) => {
  await StoreServices.deleteProductFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Product deleted succesfully');
});

export const StoreControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
