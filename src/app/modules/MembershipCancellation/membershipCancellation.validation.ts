import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email format'),
    package_name: z.string({
      required_error: 'Package name is required',
      invalid_type_error: 'Package name must be a string',
    }),
    plan: z.string({
      required_error: 'Plan is required',
      invalid_type_error: 'Plan must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    status: z
      .enum(['pending', 'processing', 'completed', 'deny'])
      .default('pending'),
  }),
});

const updateValidation = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email format')
      .optional(),
    package_name: z
      .string({
        invalid_type_error: 'Package name must be a string',
      })
      .optional(),
    plan: z
      .string({
        invalid_type_error: 'Plan must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    status: z.enum(['pending', 'processing', 'completed', 'deny']).optional(),
  }),
});

export const MembershipCancellationValidation = {
  createValidation,
  updateValidation,
};
