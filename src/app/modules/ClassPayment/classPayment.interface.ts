import mongoose from 'mongoose';

export interface IClassPayment {
  transaction_id: string;
  amount: number;
  trainer: mongoose.Types.ObjectId;
  email: string;
}
