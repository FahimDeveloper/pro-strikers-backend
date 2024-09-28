import { Model, Types } from 'mongoose';
import { IRole } from '../../utils/role';

export interface IAdmin {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  image: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  gender: 'male' | 'female';
  role: IRole;
  description: string;
  password: string;
  city?: string;
  state?: string;
  country?: string;
  nationality?: string;
  street_address?: string;
}

export interface AdminMethods extends Model<IAdmin> {
  isAdminExists(email: string): Promise<IAdmin | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
