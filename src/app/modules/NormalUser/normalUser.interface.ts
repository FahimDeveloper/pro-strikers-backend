import { Model, Types } from 'mongoose';

export type TNormalUser = {
  user: Types.ObjectId;
  email: string;
};

export interface NormalUserMethods extends Model<TNormalUser> {
  isNormalUserExists(id: string): Promise<TNormalUser | null>;
}
