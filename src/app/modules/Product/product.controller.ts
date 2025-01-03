import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const { files } = req;
  await ProductServices.createProductIntoDB(req.body, files);
  sendResponse(res, httpStatus.CREATED, 'Product created succesfully');
});

const getProducts = catchAsync(async (req, res) => {
  const { count, result } = await ProductServices.getProductsFromDB(
    req.params.category_slug,
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Products fetch succesfully', result, count);
});

const getAllProducts = catchAsync(async (req, res) => {
  const { count, result } = await ProductServices.getAllProductsFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Products fetch succesfully', result, count);
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Product fetch succesfully', result);
});

const updateProduct = catchAsync(async (req, res) => {
  const files = req.files;
  await ProductServices.updateProuctIntoDB(req.params.id, req.body, files);
  sendResponse(res, httpStatus.OK, 'Product updated succesfully');
});

const deleteProduct = catchAsync(async (req, res) => {
  await ProductServices.deleteProductFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Product deleted succesfully');
});

export const ProductControllers = {
  createProduct,
  getProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
