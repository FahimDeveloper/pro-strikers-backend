import QueryBuilder from '../../builder/QueryBuilder';
import { ISize } from './size.interface';
import Size from './size.model';

const createSizeIntoDB = async (payload: ISize) => {
  const result = await Size.create(payload);
  return result;
};

const getAllSizeFromDB = async (query: Record<any, unknown>) => {
  const colorQuery = new QueryBuilder(Size.find(), query).filter().paginate();
  const result = await colorQuery?.modelQuery;
  const count = await colorQuery?.countTotal();
  return { result, count };
};

const updateSizeIntoDB = async (id: string, payload: Partial<ISize>) => {
  const result = await Size.findByIdAndUpdate(id, payload);
  return result;
};

const deleteSizeFromDB = async (id: string) => {
  const result = await Size.findByIdAndDelete(id);
  return result;
};

export const SizeServices = {
  createSizeIntoDB,
  getAllSizeFromDB,
  updateSizeIntoDB,
  deleteSizeFromDB,
};
