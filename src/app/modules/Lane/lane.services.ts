import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { uploadMultipleImageIntoCloduinary } from '../../utils/uploadMultipleImageToCloudinary';
import { ILane } from './lane.interface';
import { Lane } from './lane.modal';

const createLaneIntoDB = async (payload: ILane, files: any) => {
  if (files?.length > 0) {
    const imageUrls = await uploadMultipleImageIntoCloduinary(files);
    const addons = payload.addons.map((addon, index) => ({
      ...addon,
      addon_image: imageUrls[index],
    }));
    const findLane = await Lane.findOne({ lane_title: payload.lane_title });
    if (findLane) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Lane title already exists, try different lane title',
      );
    }
    const result = await Lane.create({ ...payload, addons });
    return result;
  } else {
    const result = await Lane.create(payload);
    return result;
  }
};

const updateLaneIntoDB = async (
  id: string,
  payload: Partial<ILane>,
  files: any,
) => {
  if (files?.length > 0) {
    const imageUrls = await uploadMultipleImageIntoCloduinary(files);
    const oldAddons = payload?.old_addons;
    const newAddons = payload?.new_addons?.map((addon, index) => ({
      ...addon,
      addon_image: imageUrls[index],
    }));
    const addons = [...oldAddons!, ...newAddons!];
    const result = await Lane.findByIdAndUpdate(id, { ...payload, addons });
    return result;
  } else {
    const result = await Lane.findByIdAndUpdate(id, payload);
    return result;
  }
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
