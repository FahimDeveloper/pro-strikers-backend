import mongoose from 'mongoose';

export interface IClassReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  class: mongoose.Types.ObjectId;
  street_address: string;
  voucher_applied: boolean;
  city: string;
  state: string;
  sport: string;
  class_date: string;
  zip_code: string;
  trainer: mongoose.Types.ObjectId;
}

export interface IClassReservationByUser {
  class_data: IClassReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
