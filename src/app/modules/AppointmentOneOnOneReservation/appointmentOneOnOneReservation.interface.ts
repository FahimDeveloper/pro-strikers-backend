import mongoose from 'mongoose';

export interface IAppointmentOneOnOneReservation {
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
  zip_code: string;
  voucher_applied: boolean;
  trainer: mongoose.Types.ObjectId;
  bookings: IAppointmentBookings[];
}

export interface IAppointmentBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}

export interface IAppointmentOneOnOneReservationByUser {
  appointment_data: IAppointmentOneOnOneReservation;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
