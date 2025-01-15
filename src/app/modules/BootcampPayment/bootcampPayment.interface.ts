import mongoose from 'mongoose';

export interface IBootcampPayment {
  transaction_id: string;
  amount: number;
  trainer: mongoose.Types.ObjectId;
  email: string;
}
