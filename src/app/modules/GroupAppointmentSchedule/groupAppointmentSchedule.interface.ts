import { Types } from 'mongoose';

export interface IGroupAppointmentSchedule {
  _id: Types.ObjectId;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  trainer: Types.ObjectId;
  description: string;
  price: number;
  capacity: number;

  schedules: IGroupAppointmentDaySchedule[];
}

export interface IGroupAppointmentDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
