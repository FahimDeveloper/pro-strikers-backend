import mongoose from 'mongoose';

export interface IFacilityReservationCart {
  facility: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  time_slot: string;
  date: string;
}
