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

const getAllFacilitiesFromDB = async () => {
  const result = await FacilitySchedule.find();
  return result;
};

const getSingleFacilityFromDB = async (id: string) => {
  const result = await FacilitySchedule.findById(id);
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await FacilitySchedule.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return result;
};

export const FacilityScheduleServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  getAllFacilitiesFromDB,
  getSingleFacilityFromDB,
  deleteFacilityFromDB,
};
