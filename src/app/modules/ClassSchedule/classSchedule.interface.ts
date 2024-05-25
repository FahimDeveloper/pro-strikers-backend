import { Types } from 'mongoose';

export interface IClassSchedule {
  class_name: string;
  sport: string;
  description: string;
  facility: string;
  trainer: Types.ObjectId;
  level: string;
  capacity: number;
  price: number;
  schedules: IClassDaySchedule[];
  isDeleted: boolean;
}

export interface IClassDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
