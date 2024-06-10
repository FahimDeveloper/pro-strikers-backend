import mongoose from 'mongoose';

export interface IAppointmentOneOnOneReservation {
  user_email: string;
  appointment: mongoose.Types.ObjectId;
  category: string;
  trainer: string;
  booking_date: string;
  time_slots: string[];
}
