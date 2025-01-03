import QueryBuilder from '../../builder/QueryBuilder';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: ICategory, file: any) => {
  if (file) {
    const { url } = await uploadImageIntoCloduinary(file);
    payload.image = url;
  }
  const result = await Category.create(payload);
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
  file: any,
) => {
  if (file) {
    const { url } = await uploadImageIntoCloduinary(file);
    payload.image = url;
  }
  const result = await Category.findByIdAndUpdate(id, payload);
  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query).paginate();
  const result = await categoryQuery?.modelQuery;
  const count = await categoryQuery?.countTotal();
  return { result, count };
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  getAllCategoriesFromDB,
  deleteCategoryFromDB,
};
