import mongoose from 'mongoose';

export interface IClassReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  class: mongoose.Types.ObjectId;
  voucher_applied: boolean;
  payment: mongoose.Types.ObjectId;
  sport: string;
  class_date: string;
  trainer: mongoose.Types.ObjectId;
  academy: mongoose.Types.ObjectId;
}

export interface IClassReservationRequest {
  class_data: IClassReservation;
  payment_info: {
    transaction_id: string;
    trainer: mongoose.Types.ObjectId;
    amount: number;
    email: string;
  };
}
