import mongoose, { Schema } from 'mongoose';
import { IAcademyStudent } from './academyStudent.interfaces';

const AcademyStudentSchema = new Schema<IAcademyStudent>(
  {
    student_id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    guardian_name: { type: String, required: true },
    guardian_phone: { type: String, required: true },
    address: { type: String },
    academy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
    },
  },
  {
    _id: true,
    versionKey: false,
    timestamps: true,
  },
);

export const AcademyStudentModel = mongoose.model<IAcademyStudent>(
  'AcademyStudent',
  AcademyStudentSchema,
);
