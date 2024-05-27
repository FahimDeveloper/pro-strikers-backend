import { Types } from 'mongoose';

export interface IAppointmentSchedule {
  _id: Types.ObjectId;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  appointment_duration: string;
  trainer: string;
  description: string;
  price: number;
  schedules: IAppointmentDaySchedule[];
}

export interface IAppointmentDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
