import mongoose, { model, Schema } from 'mongoose';
import { ITrackStudent } from './trackStudent.interfaces';

const TrackStudentSchema = new Schema<ITrackStudent>(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    attendance_date: {
      type: Date,
      required: true,
    },
    check_in_time: {
      type: Date,
    },
    check_out_time: {
      type: Date,
    },
  },
  {
    _id: true,
    versionKey: false,
    timestamps: true,
  },
);

export const TrackStudentModel = model<ITrackStudent>(
  'TrackStudent',
  TrackStudentSchema,
);
