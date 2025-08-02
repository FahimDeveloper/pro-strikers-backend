import { Schema, model, Types } from 'mongoose';
import { ITeamMembers, ITeamMembership } from './teamMembership.interface';

// TeamMembers subdocument schema
const TeamMembersSchema = new Schema<ITeamMembers>({
  email: { type: String, required: true },
  role: { type: String, enum: ['leader', 'member'], required: true },
});

const TeamMembershipSchema = new Schema<ITeamMembership>(
  {
    membership: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CustomMembership',
    },
    team_name: { type: String, required: true },
    team: { type: [TeamMembersSchema], required: true },
    status: { type: Boolean, default: false },
    issue_date: { type: String },
    expiry_date: { type: String },
  },
  { versionKey: false, timestamps: true },
);

export const TeamMembership = model('TeamMembership', TeamMembershipSchema);
