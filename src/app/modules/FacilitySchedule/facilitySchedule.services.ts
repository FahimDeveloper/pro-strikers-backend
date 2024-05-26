import QueryBuilder from '../../builder/QueryBuilder';
import { IFacilitySchedule } from './facilitySchedule.interface';
import { FacilitySchedule } from './facilitySchedule.model';

const createFacilityIntoDB = async (payload: IFacilitySchedule) => {
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
  const facilityQuery = new QueryBuilder(
    FacilitySchedule.find().populate('trainer').select('first_name'),
    query,
  )
    .search(['facility_name'])
    .filter()
    .paginate();
  const result = await facilityQuery?.modelQuery;
  const count = await facilityQuery?.countTotal();
  return {
    count,
    ...result,
  };
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
};
