import mongoose from 'mongoose';

export interface IAppointmentReservation {
  user: mongoose.Types.ObjectId;
  appointment: mongoose.Types.ObjectId;
  issue_date: Date;
  time_slots: string[];
  isDeleted: boolean;
}
