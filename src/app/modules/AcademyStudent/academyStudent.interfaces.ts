import mongoose from 'mongoose';

export interface IAcademyStudent {
  student_id: string;
  academy: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  guardian_name: string;
  guardian_phone: string;
  address: string;
}
