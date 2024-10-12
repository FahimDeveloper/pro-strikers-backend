import QueryBuilder from '../../builder/QueryBuilder';
import { uploadMultipleImageIntoCloduinary } from '../../utils/uploadMultipleImageToCloudinary';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct, files: any) => {
  const imageUrls = await uploadMultipleImageIntoCloduinary(files);
  const result = await Product.create({
    ...payload,
    thumbnail: imageUrls[0],
    gallery: imageUrls.slice(1),
  });
  return result;
};

const updateProuctIntoDB = async (
  id: string,
  payload: Partial<IProduct>,
  files: any,
) => {
  let result;
  if (files?.length > 0) {
    const imageUrls = await uploadMultipleImageIntoCloduinary(files);
    result = await Product.findByIdAndUpdate(id, {
      ...payload,
      // images: [...payload.images!, ...imageUrls],
    });
  } else {
    result = await Product.findByIdAndUpdate(id, payload);
  }
  return result;
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
  updateProuctIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
