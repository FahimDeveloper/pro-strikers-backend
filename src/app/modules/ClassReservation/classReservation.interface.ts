import mongoose from 'mongoose';

export interface IClassReservation {
  user: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  issue_date: Date;
  time_slots: string[];
  isDeleted: boolean;
}
