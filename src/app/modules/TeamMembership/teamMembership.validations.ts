import { z } from 'zod';

export const TeamMembersZodSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Invalid email format',
    }),
  role: z.enum(['leader', 'member']),
});

const createValidation = z.object({
  body: z.object({
    membership: z.string({
      required_error: 'Membership is required',
      invalid_type_error: 'Membership must be a string',
    }),
    team_name: z.string({
      required_error: 'Team name is required',
      invalid_type_error: 'Team name must be a string',
    }),
    team: z.array(TeamMembersZodSchema),
  }),
});

const updateValidation = z.object({
  body: z.object({
    membership: z.string().optional(),
    team_name: z.string().optional(),
    team: z.array(TeamMembersZodSchema).optional(),
  }),
});

export const TeamMembershipValidation = {
  createValidation,
  updateValidation,
};
