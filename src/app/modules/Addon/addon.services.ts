import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { uploadMultipleImageIntoCloduinary } from '../../utils/uploadMultipleImageToCloudinary';
import { IAddonInfo } from './addon.interface';
import { Addon } from './addon.model';

const createAddonIntoDB = async (payload: IAddonInfo, files: any) => {
  const findAddon = await Addon.findOne({ sport: payload.sport });
  if (findAddon) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The sport addons already exists, try different sports',
    );
  }
  const imageUrls = await uploadMultipleImageIntoCloduinary(files);
  const addons = payload.addons.map((addon, index) => ({
    ...addon,
    addon_image: imageUrls[index],
  }));
  const result = await Addon.create({ ...payload, addons });
  return result;
};

const updateAddonIntoDB = async (
  id: string,
  payload: Partial<IAddonInfo>,
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
    const result = await Addon.findByIdAndUpdate(id, { ...payload, addons });
    return result;
  } else {
    const result = await Addon.findByIdAndUpdate(id, payload);
    return result;
  }
};

const getAllAddonsFromDB = async (query: Record<string, unknown>) => {
  const LanesQuery = new QueryBuilder(Addon.find(), query).filter().paginate();
  const result = await LanesQuery?.modelQuery;
  const count = await LanesQuery?.countTotal();
  return { result, count };
};

const getSingleAddonFromDB = async (id: string) => {
  const result = await Addon.findById(id);
  return result;
};

const getSportAddonsFromDB = async (query: Record<string, unknown>) => {
  const result = await Addon.findOne(query);
  return result;
};

const deleteAddonFromDB = async (id: string) => {
  const result = await Addon.findByIdAndDelete(id);
  return result;
};

export const AddonServices = {
  createAddonIntoDB,
  updateAddonIntoDB,
  getAllAddonsFromDB,
  getSingleAddonFromDB,
  deleteAddonFromDB,
  getSportAddonsFromDB,
};
