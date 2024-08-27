import mongoose from 'mongoose';

export interface IFacilityReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  facility: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  bookings: IFacilityBookings[];
}

export interface IFacilityBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}
