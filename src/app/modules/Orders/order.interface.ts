import mongoose from 'mongoose';

export interface IOrder {
  user_email: string;
  product: mongoose.Types.ObjectId;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  quantity: number;
  category: string;
  total_price: number;
}
