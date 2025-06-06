import mongoose from 'mongoose';

export interface IAppointmentPayment {
  transaction_id: string;
  amount: number;
  trainer: mongoose.Types.ObjectId;
  email: string;
}
