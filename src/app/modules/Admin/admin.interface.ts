import { Model, Types } from 'mongoose';

export interface IAdmin {
  first_name: string;
  last_name: string;
  image: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'trainer';
  description: string;
  password: string;
  isDeleted: boolean;
}

export interface AdminMethods extends Model<IAdmin> {
  isAdminExists(email: string): Promise<IAdmin | null>;
}
