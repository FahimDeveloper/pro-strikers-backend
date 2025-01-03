import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { uploadMultipleImageIntoCloduinary } from '../../utils/uploadMultipleImageToCloudinary';
import { Category } from '../Category/category.model';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct, files: any) => {
  const thumbnail = await uploadImageIntoCloduinary(files?.thumbnail[0]);
  const gallery = await uploadMultipleImageIntoCloduinary(files?.gallery);
  const result = await Product.create({
    ...payload,
    thumbnail: thumbnail.url,
    gallery: gallery,
  });
  return result;
};

const updateProuctIntoDB = async (
  id: string,
  payload: Partial<IProduct>,
  files: any,
) => {
  if (files?.thumbnail) {
    const thumbnail = await uploadImageIntoCloduinary(files?.thumbnail[0]);
    payload.thumbnail = thumbnail.url;
  }
  if (files?.gallery) {
    const gallery = await uploadMultipleImageIntoCloduinary(files?.gallery);
    if (payload.gallery) {
      payload.gallery = [...payload?.gallery, ...gallery];
    }
  }
  const result = await Product.findByIdAndUpdate(id, payload);
  return result;
};

const getProductsFromDB = async (
  category_slug: string,
  query: Record<string, unknown>,
) => {
  const category = await Category.findOne({ slug: category_slug });
  if (!category) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Products not found');
  }
  const ProductQuery = new QueryBuilder(
    Product.find({ category: category?.name.toLowerCase() }).select([
      'name',
      'rating',
      'offer_price',
      'regular_price',
      'thumbnail',
    ]),
    query,
  ).paginate();
  const result = await ProductQuery?.modelQuery;
  const count = await ProductQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(Product.find(), query)
    .search(['name'])
    .filter()
    .paginate();
  const result = await ProductQuery?.modelQuery;
  const count = await ProductQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  updateProuctIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
