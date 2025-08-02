import { Types } from 'mongoose';

export interface ITeamMembership {
  membership: Types.ObjectId;
  team_name: string;
  team: ITeamMembers[];
  status?: boolean;
  issue_date?: string;
  expiry_date?: string;
}

export interface ITeamMembers {
  email: string;
  role: string;
}
