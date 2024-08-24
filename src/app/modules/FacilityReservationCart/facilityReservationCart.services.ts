import httpStatus from 'http-status';
import { IFacilityReservationCart } from './facilityReservationCart.interface';
import { facilityReservationCart } from './facilityReservationCart.model';
import AppError from '../../errors/AppError';

const createFacilityReservationCartIntoDB = async (
  payload: IFacilityReservationCart,
) => {
  const findTheSlot = await facilityReservationCart.findOne({
    facility: payload.facility,
    time_slot: payload.time_slot,
    date: payload.date,
  });
  if (findTheSlot) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  const result = await facilityReservationCart.create(payload);
  return result;
};

const getFacilityReservationCartByFaciliyAndDateFromDB = async (
  query: Record<string, unknown>,
) => {
  const result = await facilityReservationCart.find(query);
  return result;
};

const deleteSingleFacilityReservationCartFromDB = async (id: string) => {
  const result = await facilityReservationCart.findByIdAndDelete(id);
  return result;
};

const deleteUserFacilityReservationCartFromDB = async (id: string) => {
  const result = await facilityReservationCart.deleteMany({ user: id });
  return result;
};

export const FacilityReservationCartServices = {
  getFacilityReservationCartByFaciliyAndDateFromDB,
  createFacilityReservationCartIntoDB,
  deleteSingleFacilityReservationCartFromDB,
  deleteUserFacilityReservationCartFromDB,
};
