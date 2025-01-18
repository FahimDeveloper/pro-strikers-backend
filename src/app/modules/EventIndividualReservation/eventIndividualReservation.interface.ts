import mongoose from 'mongoose';

export interface IEventIndividualReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  event: mongoose.Types.ObjectId;
  payment: mongoose.Types.ObjectId;
  voucher_applied: boolean;
  sport: string;
}

export interface IEventIndividualReservationRequest {
  event_data: IEventIndividualReservation;
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
  };
}
