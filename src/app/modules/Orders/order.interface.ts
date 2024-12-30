import mongoose from 'mongoose';

export interface IOrder {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  color: string;
  size: string;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timeline: Array<ITimeline>;
  street_address: string;
  city: string;
  state: string;
  phone: string;
  zip_code: string;
  country: string;
  order_id: string;
}

export interface ITimeline {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  note: string;
  date: string;
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
