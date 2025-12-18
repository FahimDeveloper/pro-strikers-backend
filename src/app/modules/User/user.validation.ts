import { z } from 'zod';

const generalCreditSchema = z.object({
  session_credit: z.string().optional(),
  machine_credit: z.string().optional(),
});

const academyCreditSchema = z.object({
  session_credit: z.string().optional(),
});

const generalMembershipSchema = z.object({
  membership: z.boolean().default(false),
  status: z.boolean().optional(),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
  package_name: z.string().optional(),
  plan: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
  credit_balance: generalCreditSchema.optional(),
  credit_date: z.date().optional(),
});

const academyMembershipSchema = z.object({
  membership: z.boolean().default(false),
  status: z.boolean().optional(),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
  package_name: z.string().optional(),
  plan: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
  credit_balance: academyCreditSchema.optional(),
  credit_date: z.date().optional(),
});

export const createValidation = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'first name is required',
    }),

    last_name: z.string({
      required_error: 'last name is required',
    }),

    gender: z.enum(['male', 'female']).optional(),

    email: z
      .string({ required_error: 'email is required' })
      .email('Please enter a valid email address'),

    password: z.string({
      required_error: 'password is required',
    }),

    provider: z
      .enum(['email with password', 'google', 'facebook'])
      .default('email with password'),

    role: z.enum(['user']).default('user'),

    phone: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    street_address: z.string().optional(),
    zip_code: z.string().optional(),
    nationality: z.string().optional(),
    country: z.string().optional(),
    date_of_birth: z.string().optional(),

    general_membership: generalMembershipSchema.default({
      membership: false,
    }),

    academy_membership: academyMembershipSchema.default({
      membership: false,
    }),

    pass_pack: z
      .object({
        session_credit: z.string(),
        machine_credit: z.string(),
        issue_date: z.string(),
        expiry_date: z.string(),
      })
      .optional(),
  }),
});

export const updateValidation = z.object({
  body: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),

      email: z.string().email().optional(),
      password: z.string().optional(),

      provider: z
        .enum(['email with password', 'google', 'facebook'])
        .optional(),

      role: z.enum(['user']).optional(),

      phone: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      street_address: z.string().optional(),
      zip_code: z.string().optional(),
      nationality: z.string().optional(),
      country: z.string().optional(),
      date_of_birth: z.string().optional(),

      general_membership: generalMembershipSchema.optional(),
      academy_membership: academyMembershipSchema.optional(),

      pass_pack: z
        .object({
          session_credit: z.string(),
          machine_credit: z.string(),
          issue_date: z.string(),
          expiry_date: z.string(),
        })
        .optional(),
    })
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});

export const UserValidations = {
  createValidation,
  updateValidation,
};
