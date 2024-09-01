import mongoose from 'mongoose';

export interface IClassReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  class: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  class_date: Date;
  zip_code: string;
  trainer: mongoose.Types.ObjectId;
}
