import mongoose, { model, Schema } from 'mongoose';
import { ITrackAcademyStudent } from './trackAcademyStudent.interfaces';

const TrackAcademyStudentSchema = new Schema<ITrackAcademyStudent>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    academy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
    },
    attendance_date: {
      type: String,
      required: true,
    },
    check_in_time: {
      type: String,
    },
    check_out_time: {
      type: String,
    },
  },
  {
    _id: true,
    versionKey: false,
    timestamps: true,
  },
);

export const TrackAcademyStudentModel = model<ITrackAcademyStudent>(
  'TrackAcademyStudent',
  TrackAcademyStudentSchema,
);
