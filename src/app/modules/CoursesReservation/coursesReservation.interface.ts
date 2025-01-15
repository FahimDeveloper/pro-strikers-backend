import mongoose from 'mongoose';

export interface ICourseReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  course: mongoose.Types.ObjectId;
  voucher_applied: boolean;
  payment: mongoose.Types.ObjectId;
  sport: string;
  trainer: mongoose.Types.ObjectId;
}

export interface ICourseReservationRequest {
  course_data: ICourseReservation;
  payment_info: {
    transaction_id: string;
    trainer: mongoose.Types.ObjectId;
    amount: number;
    email: string;
  };
}
