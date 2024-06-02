import { Model, Types } from 'mongoose';

export interface IAdmin {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  image: File;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  role: 'superAdmin' | 'admin' | 'trainer';
  description: string;
  password: string;
}

export interface AdminMethods extends Model<IAdmin> {
  isAdminExists(email: string): Promise<IAdmin | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
