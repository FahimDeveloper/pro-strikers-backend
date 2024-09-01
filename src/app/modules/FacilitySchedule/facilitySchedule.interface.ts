import { Types } from 'mongoose';

export interface IFacilitySchedule {
  _id: Types.ObjectId;
  facility_name: string;
  sport: string;
  facility: string;
  duration: number;
  description: string;
  price: number;
  lane: string;

  schedules: Array<IFacilityDaySchedule>;
}

export interface IFacilityDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
