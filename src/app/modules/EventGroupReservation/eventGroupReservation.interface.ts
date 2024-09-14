import mongoose from 'mongoose';

export interface IEventGroupReservation {
  first_name: string;
  last_name: string;
  skill_lavel: string;
  email: string;
  phone: string;
  age: number;
  event: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  voucher_applied: boolean;
  state: string;
  sport: string;
  zip_code: string;
  team_name: string;
  team: IEventGroupMembers[];
}

export interface IEventGroupReservationByUser {
  event_data: IEventGroupReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}

export interface IEventGroupMembers {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  contact: string;
}
