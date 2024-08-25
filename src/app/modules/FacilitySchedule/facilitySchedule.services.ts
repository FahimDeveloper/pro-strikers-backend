import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  IFacilityDaySchedule,
  IFacilitySchedule,
} from './facilitySchedule.interface';
import { FacilitySchedule } from './facilitySchedule.model';
import AppError from '../../errors/AppError';
import moment from 'moment';

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
  return result;
};

const getFacilityByDateFromDB = async (payload: any) => {
  const result = await FacilitySchedule.findById(payload.id).select(
    'sport schedules trainer duration',
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility not found');
  }
  const day = moment(payload.date).format('dddd');
  if (result) {
    let schedule;
    schedule = result?.schedules.find(
      (schedule: IFacilityDaySchedule) => schedule.day === day,
    );
    if (!schedule?.active) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Facility not available in your selected date',
      );
    }
    result.schedules = [schedule];
    return result;
  }
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
  getFacilityByDateFromDB,
  getFacilityByQueryFromDB,
};
