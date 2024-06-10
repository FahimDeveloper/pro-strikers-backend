import QueryBuilder from '../../builder/QueryBuilder';
import { uploadMultipleImageIntoCloduinary } from '../../utils/uploadMultipleImageToCloudinary';
import { IStore } from './store.interface';
import { Store } from './store.model';

const createProductIntoDB = async (payload: IStore, files: any) => {
  const imageUrls = await uploadMultipleImageIntoCloduinary(files);
  const result = await Store.create({ ...payload, images: imageUrls });
  return result;
};

const updateProuctIntoDB = async (
  id: string,
  payload: Partial<IStore>,
  files: any,
) => {
  let result;
  console.log(files);
  console.log(payload);
  if (files.length > 0) {
    const imageUrls = await uploadMultipleImageIntoCloduinary(files);
    result = await Store.findByIdAndUpdate(id, {
      ...payload,
      images: [...payload.images!, ...imageUrls],
    });
  } else {
    result = await Store.findByIdAndUpdate(id, payload);
  }
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const storeQuery = new QueryBuilder(Store.find(), query)
    .search(['product_name'])
    .filter()
    .paginate();
  const result = await storeQuery?.modelQuery;
  const count = await storeQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Store.findById(id);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Store.findByIdAndDelete(id);
  return result;
};

export const StoreServices = {
  createProductIntoDB,
  updateProuctIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
