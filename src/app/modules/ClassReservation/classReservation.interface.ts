import mongoose from 'mongoose';

export interface IClassReservation {
  user_email: string;
  class: mongoose.Types.ObjectId;
  category: string;
  trainer: string;
  issue_date: string;
  class_date: string;
}
