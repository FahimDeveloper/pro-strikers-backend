import mongoose from 'mongoose';

export interface ICourseReservation {
  user_email: string;
  course: mongoose.Types.ObjectId;
  category: string;
  trainer: string;
  issue_date: string;
  course_date: string;
}
