import mongoose from 'mongoose';

export interface IAppointmentGroupReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  appointment: mongoose.Types.ObjectId;
  payment: mongoose.Types.ObjectId;
  sport: string;
  appointment_date: string;
  voucher_applied: boolean;
  trainer: mongoose.Types.ObjectId;
  academy: mongoose.Types.ObjectId;
}

export interface IAppointmentGroupReservationByUser {
  appointment_data: IAppointmentGroupReservation;
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
    trainer: mongoose.Types.ObjectId;
  };
}
