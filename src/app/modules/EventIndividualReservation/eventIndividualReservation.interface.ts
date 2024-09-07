import mongoose from 'mongoose';

export interface IEventIndividualReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  event: mongoose.Types.ObjectId;
  street_address: string;
  voucher_applied: boolean;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
}

export interface IEventIndividualReservationByUser {
  event_data: IEventIndividualReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
