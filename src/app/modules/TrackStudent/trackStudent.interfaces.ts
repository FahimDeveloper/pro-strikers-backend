export interface ITrackStudent {
  email: string;
  phone: string;
  attendance_date: Date;
  check_in_time: Date;
  check_out_time: Date;
}

export interface IPayload {
  email: string;
}
