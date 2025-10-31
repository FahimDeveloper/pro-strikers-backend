import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    academy_title: z.string({
      required_error: 'Academy name is required',
      invalid_type_error: 'Academy name must be a string',
    }),
    academy_membership_title: z.string({
      required_error: 'Academy membership is required',
      invalid_type_error: 'Academy membership must be a string',
    }),
    academy_membership_price: z.number({
      required_error: 'Academy membership price is required',
      invalid_type_error: 'Academy membership price must be a number',
    }),
    academy_admin: z.object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email format'),
      phone: z.string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone must be a string',
      }),
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    academy_title: z
      .string({
        invalid_type_error: 'Academy name must be a string',
      })
      .optional(),
    academy_membership_title: z
      .string({
        invalid_type_error: 'Academy membership must be a string',
      })
      .optional(),
    academy_membership_price: z
      .number({
        invalid_type_error: 'Academy membership price must be a number',
      })
      .optional(),
    academy_admin: z
      .object({
        email: z
          .string({
            invalid_type_error: 'Email must be a string',
          })
          .email('Invalid email format'),
        phone: z.string({
          invalid_type_error: 'Phone must be a string',
        }),
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
  }),
});

export const AcademyValidation = {
  createValidation,
  updateValidation,
};
