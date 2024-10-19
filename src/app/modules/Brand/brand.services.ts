import QueryBuilder from '../../builder/QueryBuilder';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: IBrand, file: any) => {
  const { url } = await uploadImageIntoCloduinary(file);
  const result = await Brand.create({ ...payload, brand_logo: url });
  return result;
};

const updateBrandIntoDB = async (id: string, payload: IBrand, file: any) => {
  if (file) {
    const { url } = await uploadImageIntoCloduinary(file);
    payload.brand_logo = url;
  }
  const result = await Brand.findByIdAndUpdate(id, payload);
  return result;
};

const getBrandsByCategoryFromDB = async (category: string) => {
  const result = await Brand.find({ category });
  return result;
};

const getAllBrandsFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find(), query)
    .search(['brand_name'])
    .filter()
    .paginate();
  const result = await brandQuery?.modelQuery;
  const count = await brandQuery?.countTotal();
  return { result, count };
};

const getSingleBrandFromDB = async (id: string) => {
  const result = await Brand.findById(id);
  return result;
};

const deleteBrandFromDB = async (id: string) => {
  const result = await Brand.findByIdAndDelete(id);
  return result;
};

export const BrandServices = {
  createBrandIntoDB,
  updateBrandIntoDB,
  getBrandsByCategoryFromDB,
  getAllBrandsFromDB,
  getSingleBrandFromDB,
  deleteBrandFromDB,
};
