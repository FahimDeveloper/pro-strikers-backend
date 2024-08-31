import mongoose from 'mongoose';

export interface IAppointmentOneOnOneReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  appointment: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  trainer: mongoose.Types.ObjectId;
  bookings: IAppointmentBookings[];
}

export interface IAppointmentBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}
