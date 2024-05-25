import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    first_name: z.string({
      invalid_type_error: 'first name must be string',
      required_error: 'first name is required',
    }),
    last_name: z.string({
      invalid_type_error: 'last name must be string',
      required_error: 'last name is required',
    }),
    gender: z.enum(['male', 'female']),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({
        message: 'Please enter a valid email address',
      }),
    password: z.string({
      invalid_type_error: 'password must be string',
      required_error: 'password is required',
    }),
    role: z.enum(['user']),
    phone: z.string({
      invalid_type_error: 'phone must be string',
      required_error: 'phone is required',
    }),
    date_of_birth: z
      .string({
        invalid_type_error: 'type must be string',
        required_error: 'type is required',
      })
      .date(),
    membership: z.object({
      membership: z.boolean({
        invalid_type_error: 'type must be boolean',
        required_error: 'membership is required',
      }),
      active: z
        .boolean({
          invalid_type_error: 'type must be boolean',
        })
        .optional(),
      issue_date: z
        .string({
          invalid_type_error: 'issue data must be string',
        })
        .date()
        .optional(),
      expiry_date: z
        .string({
          invalid_type_error: 'expiry data must be string',
        })
        .date()
        .optional(),
      package_name: z
        .string({
          invalid_type_error: 'package name must be string',
        })
        .optional(),
      plan: z.enum(['monthly', 'yearly']).optional(),
    }),
    isDeleted: z
      .boolean({
        invalid_type_error: 'type must be boolean',
      })
      .default(false),
  }),
});

const updateValidation = z.object({
  body: z.object({
    first_name: z
      .string({
        invalid_type_error: 'first name must be string',
        required_error: 'first name is required',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'last name must be string',
        required_error: 'last name is required',
      })
      .optional(),
    gender: z.enum(['male', 'female']).optional(),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({
        message: 'Please enter a valid email address',
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: 'password must be string',
        required_error: 'password is required',
      })
      .optional(),
    role: z.enum(['user']).optional(),
    phone: z
      .string({
        invalid_type_error: 'phone must be string',
        required_error: 'phone is required',
      })
      .optional(),
    date_of_birth: z
      .string({
        invalid_type_error: 'type must be string',
        required_error: 'type is required',
      })
      .date()
      .optional(),
    membership: z
      .object({
        membership: z
          .boolean({
            invalid_type_error: 'type must be boolean',
            required_error: 'membership is required',
          })
          .optional(),
        active: z
          .boolean({
            invalid_type_error: 'type must be boolean',
          })
          .optional(),
        issue_date: z
          .string({
            invalid_type_error: 'issue data must be string',
          })
          .date()
          .optional(),
        expiry_date: z
          .string({
            invalid_type_error: 'expiry data must be string',
          })
          .date()
          .optional(),
        package_name: z
          .string({
            invalid_type_error: 'package name must be string',
          })
          .optional(),
        plan: z.enum(['monthly', 'yearly']).optional(),
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'type must be boolean',
      })
      .default(false)
      .optional(),
  }),
});

export const UserValidations = {
  createValidation,
  updateValidation,
};
