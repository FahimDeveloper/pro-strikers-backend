/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
  gender?: 'male' | 'female';
  email: string;
  password: string;
  role: 'user';
  phone?: string;
  provider: 'email with password' | 'google' | 'facebook';
  verified: boolean;
  waiver_sign: boolean;
  street_address?: string;
  zip_code?: string;
  city?: string;
  state?: string;
  country?: string;
  nationality?: string;
  date_of_birth?: string;
  membership?: boolean;
  status?: boolean;
  issue_date?: string;
  expiry_date?: string;
  package_name?: string;
  plan?: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export interface IUserMembership {
  membership: {
    package_name: string;
    plan: string;
    status: boolean;
    membership: boolean;
    issue_date: string;
    expiry_date: string;
  };
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
