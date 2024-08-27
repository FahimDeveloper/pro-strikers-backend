import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IFacilityReservation } from './facilityReservation.interface';
import { FacilityReservation } from './facilityReservation.model';
import { SlotBooking } from '../SlotBooking/slotBooking.model';

const createFacilityReservationIntoDB = async (
  id: string,
  payload: IFacilityReservation,
) => {
  const deleteSlots = await SlotBooking.deleteMany({
    user: id,
    training: payload.facility,
  });
  if (deleteSlots) {
    const result = await FacilityReservation.create(payload);
    return result;
  } else {
    throw new Error('Failed your facility reservation');
  }
};

const updateFacilityReservationIntoDB = async (
  id: string,
  payload: Partial<IFacilityReservation>,
) => {
  const result = await FacilityReservation.findByIdAndUpdate(id, payload);
  return result;
};

const getAllFacilitiesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const facilityReservationQuery = new QueryBuilder(
    FacilityReservation.find().populate([
      {
        path: 'facility',
        select: 'facility_name duration',
      },
    ]),
    query,
  )
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await facilityReservationQuery?.modelQuery;
  const count = await facilityReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getFacilityReservationSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date, training } = query;
  const result = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $match: {
        'bookings.date': date,
        'bookings.training': new mongoose.Types.ObjectId(training as string),
      },
    },
    {
      $project: {
        _id: 0,
        date: '$bookings.date',
        time_slot: '$bookings.time_slot',
        training: '$bookings.training',
      },
    },
  ]);
  return result;
};

const getSingleFacilityReservationFromDB = async (id: string) => {
  const result = await FacilityReservation.findById(id);
  return result;
};

const deleteFacilityReservationFromDB = async (id: string) => {
  const result = await FacilityReservation.findByIdAndDelete(id);
  return result;
};

export const FacilityReservationServices = {
  createFacilityReservationIntoDB,
  updateFacilityReservationIntoDB,
  getAllFacilitiesReservationsFromDB,
  getSingleFacilityReservationFromDB,
  deleteFacilityReservationFromDB,
  getFacilityReservationSlotsFromDB,
};
