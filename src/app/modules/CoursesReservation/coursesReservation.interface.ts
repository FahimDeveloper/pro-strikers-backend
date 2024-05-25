import mongoose from 'mongoose';

export interface ICourseReservation {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  issue_date: Date;
  isDeleted: boolean;
}
