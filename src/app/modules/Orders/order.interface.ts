import mongoose from 'mongoose';

export interface IOrder {
  user_email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  color: string;
  size: string;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timeline: Array<ITimeline>;
}

export interface ITimeline {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  note: string;
  date: Date;
}

export type IOrderRequest = {
  orders: Array<IOrder>;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
};
