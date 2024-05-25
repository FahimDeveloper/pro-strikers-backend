import mongoose from 'mongoose';

export interface IFacilitySchedule {
  facility_name: string;
  category: string;
  facility_duration: number;
  trainer: mongoose.Types.ObjectId;
  description: string;
  price: number;
  lane_facilities: Array<ILaneFacilities>;
  schedules: Array<IFacilityDaySchedule>;
  isDeleted: boolean;
}

export interface ILaneFacilities {
  lane_type: string;
  lane_name: string;
  price: number;
}

export interface IFacilityDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
