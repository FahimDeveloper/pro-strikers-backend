import mongoose from 'mongoose';

export interface ISlotBooking {
  id: string;
  training: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  time_slot: string;
  date: string;
}
