import mongoose from 'mongoose';

export interface ISlotBooking {
  training: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  time_slot: string;
  date: string;
}
