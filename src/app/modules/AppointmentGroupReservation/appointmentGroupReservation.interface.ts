import mongoose from 'mongoose';

export interface IAppointmentGroupReservation {
  user_email: string;
  appointment: mongoose.Types.ObjectId;
  category: string;
  trainer: string;
  booking_date: string;
}
