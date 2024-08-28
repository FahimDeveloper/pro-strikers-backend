import mongoose from 'mongoose';

export interface ICourseReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  course: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
}
