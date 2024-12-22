import QueryBuilder from '../../builder/QueryBuilder';
import { IColor } from './color.interface';
import Color from './color.model';

const createColorIntoDB = async (payload: IColor) => {
  const result = await Color.create(payload);
  return result;
};

const getAllColorFromDB = async (query: Record<any, unknown>) => {
  const colorQuery = new QueryBuilder(Color.find(), query).filter().paginate();
  const result = await colorQuery?.modelQuery;
  const count = await colorQuery?.countTotal();
  return { result, count };
};

const updateColorIntoDB = async (id: string, payload: Partial<IColor>) => {
  const result = await Color.findByIdAndUpdate(id, payload);
  return result;
};

const deleteColorFromDB = async (id: string) => {
  const result = await Color.findByIdAndDelete(id);
  return result;
};

export const ColorServices = {
  createColorIntoDB,
  getAllColorFromDB,
  updateColorIntoDB,
  deleteColorFromDB,
};
