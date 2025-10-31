import mongoose from 'mongoose';

export interface ITrackAcademyStudent {
  student: mongoose.Types.ObjectId;
  academy: mongoose.Types.ObjectId;
  attendance_date: string;
  check_in_time: string;
  check_out_time: string;
}
