import mongoose from 'mongoose';

export interface IPayment {
  transaction_id: string;
  amount: number;
  user: mongoose.Types.ObjectId;
  email: string;
  service: string;
}
