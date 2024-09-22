import QueryBuilder from '../../builder/QueryBuilder';
import { ILane } from './lane.interface';
import { Lane } from './lane.modal';

const createLaneIntoDB = async (payload: ILane) => {
  const result = await Lane.create(payload);
  return result;
};

const updateLaneIntoDB = async (id: string, payload: Partial<ILane>) => {
  const result = await Lane.findByIdAndUpdate(id, payload);
  return result;
};

const getAllLanesFromDB = async (query: Record<string, unknown>) => {
  const LanesQuery = new QueryBuilder(Lane.find(), query)
    .search(['lane_title'])
    .filter()
    .paginate();
  const result = await LanesQuery?.modelQuery;
  const count = await LanesQuery?.countTotal();
  return { result, count };
};

const getSingleLaneFromDB = async (id: string) => {
  const result = await Lane.findById(id);
  return result;
};

const getLanesFromDB = async () => {
  const result = await Lane.find().select('lane_title');
  return result;
};

const deleteLaneFromDB = async (id: string) => {
  const result = await Lane.findByIdAndDelete(id);
  return result;
};

export const LaneServices = {
  createLaneIntoDB,
  updateLaneIntoDB,
  getAllLanesFromDB,
  getSingleLaneFromDB,
  deleteLaneFromDB,
  getLanesFromDB,
};
