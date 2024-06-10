import mongoose from 'mongoose';

export interface IFacilityReservation {
  user_email: string;
  facility: mongoose.Types.ObjectId;
  category: string;
  trainer: string;
  issue_date: string;
  facility_date: string;
  time_slots: string[];
}
