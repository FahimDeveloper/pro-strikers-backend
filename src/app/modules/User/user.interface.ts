/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
  role: 'user';
  phone: string;
  date_of_birth?: string;
  membership: boolean;
  status: boolean;
  issue_date?: string;
  expiry_date?: string;
  package_name?: string;
  plan?: string;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
