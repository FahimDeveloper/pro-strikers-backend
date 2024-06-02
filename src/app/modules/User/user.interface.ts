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
  date_of_birth: Date;
  membership: boolean;
  activity: boolean;
  issue_date?: Date;
  expiry_date?: Date;
  package_name: string;
  plan: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
