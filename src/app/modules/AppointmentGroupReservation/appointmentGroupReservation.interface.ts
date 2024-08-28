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
  date: Date;
  zip_code: string;
  trainer: mongoose.Types.ObjectId;
}
