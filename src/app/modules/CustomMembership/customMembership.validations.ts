import { z } from 'zod';

export const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }),
    billing_cycle: z.enum(['month', 'year'], {
      required_error: 'Billing cycle is required',
      invalid_type_error: 'Billing cycle must be either "month" or "year"',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
  }),
});

export const CustomMembershipValidation = {
  createValidation,
};
