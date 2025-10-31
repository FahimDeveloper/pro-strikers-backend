import mongoose from 'mongoose';

export interface IAcademy {
  academy_title: string;
  sport: string;
  academy_membership_title: string;
  academy_membership_price: number;
  academy_admin: mongoose.Types.ObjectId;
  description: string;
}
