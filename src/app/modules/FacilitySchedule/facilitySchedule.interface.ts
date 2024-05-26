import { Types } from 'mongoose';

export interface IFacilitySchedule {
  _id: Types.ObjectId;
  facility_name: string;
  category: string;
  facility_duration: number;
  trainer: Types.ObjectId;
  description: string;
  price: number;
  lane: string;
  schedules: Array<IFacilityDaySchedule>;
  isDeleted: boolean;
}

export interface IFacilityDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
