import mongoose from 'mongoose';

export interface ICourseReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  course: mongoose.Types.ObjectId;
  street_address: string;
  voucher_applied: boolean;
  city: string;
  state: string;
  sport: string;
  trainer: mongoose.Types.ObjectId;
  zip_code: string;
}

export interface ICourseReservationByUser {
  course_data: ICourseReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
