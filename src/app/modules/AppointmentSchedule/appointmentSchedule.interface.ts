import { Types } from 'mongoose';

export interface IAppointmentSchedule {
  _id: Types.ObjectId;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  appointment_duration: number;
  trainer: Types.ObjectId;
  description: string;
  price: number;
  schedules: IAppointmentDaySchedule[];
  isDeleted: boolean;
}

export interface IAppointmentDaySchedule {
  day: string;
  active: boolean;
  start_time: Date;
  end_time: Date;
}
