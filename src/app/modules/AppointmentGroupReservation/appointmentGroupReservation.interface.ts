import mongoose from 'mongoose';

export interface IAppointmentGroupReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  appointment: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  appointment_date: string;
  voucher_applied: boolean;
  zip_code: string;
  trainer: mongoose.Types.ObjectId;
}

export interface IAppointmentGroupReservationByUser {
  appointment_data: IAppointmentGroupReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
