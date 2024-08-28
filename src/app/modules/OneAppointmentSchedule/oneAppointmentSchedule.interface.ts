import { Types } from 'mongoose';

export interface IOneAppointmentSchedule {
  _id: Types.ObjectId;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  duration: number;
  trainer: Types.ObjectId;
  description: string;
  price: number;
  capacity: number;
  schedules: IOneAppointmentDaySchedule[];
}

export interface IOneAppointmentDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
