import mongoose from 'mongoose';

export interface IAppointmentOneOnOneReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  appointment: mongoose.Types.ObjectId;
  sport: string;
  voucher_applied: boolean;
  payment: mongoose.Types.ObjectId;
  trainer: mongoose.Types.ObjectId;
  bookings: IAppointmentBookings[];
}

export interface IAppointmentBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}

export interface IAppointmentOneOnOneReservationByUser {
  appointment_data: IAppointmentOneOnOneReservation;
  payment_info: {
    transaction_id: string;
    trainer: mongoose.Types.ObjectId;
    amount: number;
    email: string;
  };
}
