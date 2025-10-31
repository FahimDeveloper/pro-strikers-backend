import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
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
    date_of_birth: z.coerce.date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Date of birth must be a valid date',
    }),
    guardian_name: z.string({
      required_error: 'Guardian name is required',
      invalid_type_error: 'Guardian name must be a string',
    }),
    guardian_phone: z.string({
      required_error: 'Guardian phone is required',
      invalid_type_error: 'Guardian phone must be a string',
    }),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
    academy: z.string({
      required_error: 'Academy is required',
      invalid_type_error: 'Academy must be a string',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email format')
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone must be a string',
      })
      .optional(),
    date_of_birth: z.coerce
      .date({
        invalid_type_error: 'Date of birth must be a valid date',
      })
      .optional(),
    guardian_name: z
      .string({
        invalid_type_error: 'Guardian name must be a string',
      })
      .optional(),
    guardian_phone: z
      .string({
        invalid_type_error: 'Guardian phone must be a string',
      })
      .optional(),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
    academy: z
      .string({
        invalid_type_error: 'Academy must be a string',
      })
      .optional(),
  }),
});

export const AcademyStudentValidation = {
  createValidation,
  updateValidation,
};
