import mongoose from 'mongoose';

export interface ICourseReservation {
  player_name: string;
  email: string;
  phone: string;
  age: number;
  course: mongoose.Types.ObjectId;
  trainer: string;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  skill_level: string;
}
