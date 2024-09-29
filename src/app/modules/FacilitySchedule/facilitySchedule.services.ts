import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IFacilitySchedule } from './facilitySchedule.interface';
import { FacilitySchedule } from './facilitySchedule.model';
import AppError from '../../errors/AppError';

const createFacilityIntoDB = async (payload: IFacilitySchedule) => {
  const findSport = await FacilitySchedule.findOne({ sport: payload.sport });
  if (findSport) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Sport Facility already exists',
    );
  }
  const result = await FacilitySchedule.create(payload);
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<IFacilitySchedule>,
) => {
  const result = await FacilitySchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllFacilitiesFromDB = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(FacilitySchedule.find(), query)
    .search(['facility_name'])
    .filter()
    .paginate();
  const result = await facilityQuery?.modelQuery;
  const count = await facilityQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getFacilityByQueryFromDB = async (query: Record<string, unknown>) => {
  const result = await FacilitySchedule.findOne(query);
  if (result) {
    return result;
  } else {
    return {};
  }
};

const getFaciliyByIdFromDB = async (payload: any) => {
  const result = await FacilitySchedule.findById(payload.id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility not found, please provide a valid ID',
    );
  }
  return result;
};

const getSingleFacilityFromDB = async (id: string) => {
  const result = await FacilitySchedule.findById(id);
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await FacilitySchedule.findByIdAndDelete(id);
  return result;
};

export const FacilityScheduleServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  getAllFacilitiesFromDB,
  getSingleFacilityFromDB,
  deleteFacilityFromDB,
  getFaciliyByIdFromDB,
  getFacilityByQueryFromDB,
};
