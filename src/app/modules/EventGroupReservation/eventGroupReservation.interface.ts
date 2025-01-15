import mongoose from 'mongoose';

export interface IEventGroupReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  event: mongoose.Types.ObjectId;
  voucher_applied: boolean;
  sport: string;
  team_name: string;
  team: IEventGroupMembers[];
  payment: mongoose.Types.ObjectId;
}

export interface IEventGroupReservationByUser {
  event_data: IEventGroupReservation;
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
  };
}

export interface IEventGroupMembers {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  contact: string;
}
