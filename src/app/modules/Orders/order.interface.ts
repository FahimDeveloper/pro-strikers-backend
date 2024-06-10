import mongoose from 'mongoose';

export interface IOrder {
  user_email: string;
  product_id: mongoose.Types.ObjectId;
  status: string;
  quantity: number;
  category: string;
  total_price: number;
}
