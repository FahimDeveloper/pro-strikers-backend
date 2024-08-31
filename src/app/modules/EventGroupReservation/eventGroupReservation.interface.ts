import mongoose from 'mongoose';

export interface IEventGroupReservation {
  first_name: string;
  last_name: string;
  skill_lavel: string;
  email: string;
  phone: string;
  age: number;
  // preferred_time: string;
  // preferred_date: string;
  event: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  team_name: string;
  team: IEventGroupMembers[];
}

export interface IEventGroupMembers {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  contact: string;
}
