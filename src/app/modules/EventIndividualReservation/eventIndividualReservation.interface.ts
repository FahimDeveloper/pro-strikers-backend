import mongoose from 'mongoose';

export interface IEventIndividualReservation {
  player_name: string;
  email: string;
  phone: string;
  age: number;
  event: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  play_mode: string;
}
