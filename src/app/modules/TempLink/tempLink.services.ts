import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TempLink } from './tempLink.modal';

const createTempLinkIntoDB = async (payload: ITempLink) => {
  const result = await TempLink.create({
    ...payload,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  });
  return result;
};

const getTempLinkFromDB = async (id: string) => {
  const result = await TempLink.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Expired');
  }
  return result;
};

export const TempLinkServices = {
  createTempLinkIntoDB,
  getTempLinkFromDB,
};
