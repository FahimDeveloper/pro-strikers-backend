import mongoose from 'mongoose';

export interface IAppointmentGroupReservation {
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
  team_name: string;
  team: IAppointmentGroupMembers[];
  bookings: IAppointmentBookings[];
}

export interface IAppointmentGroupMembers {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  contact: string;
}

export interface IAppointmentBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}
