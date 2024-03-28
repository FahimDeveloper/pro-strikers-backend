import { Model, Types } from 'mongoose';

export type TAdmin = {
  user: Types.ObjectId;
  email: string;
};

export interface AdminMethods extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
