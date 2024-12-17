import { z } from 'zod';

const timeSchema = z.object({
  cage: z.string({
    required_error: 'cage is required',
    invalid_type_error: 'cage must be a string',
  }),
  hour: z
    .number({
      required_error: 'Hour is required',
      invalid_type_error: 'Hour must be a number',
    })
    .int('Hour must be an integer'),
  start_time: z.string({
    required_error: 'Start time is required',
    invalid_type_error: 'Start time must be a valid date string',
  }),
  end_time: z.string({
    required_error: 'End time is required',
    invalid_type_error: 'End time must be a valid date string',
  }),
});

const attendanceSchema = z.object({
  date: z.string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a valid date string',
  }),
  times: z
    .array(timeSchema, {
      required_error: 'Times is required',
      invalid_type_error: 'Times must be an array of valid time objects',
    })
    .nonempty('Times must not be empty'),
});

const createValidation = z.object({
  body: z.object({
    package: z.string({
      required_error: 'Package is required',
      invalid_type_error: 'Package must be a string',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }),
    active: z.boolean({
      required_error: 'Active is required',
      invalid_type_error: 'Active must be a boolean',
    }),
    validity: z.string({
      required_error: 'Validity is required',
      invalid_type_error: 'Validity must be a valid date string',
    }),
    hours: z.number({
      required_error: 'Hours is required',
      invalid_type_error: 'Hours must be a number',
    }),
    piching_machine: z.boolean({
      required_error: 'Piching machine is required',
      invalid_type_error: 'Piching machine must be a boolean',
    }),
    attendance: z
      .array(attendanceSchema, {
        required_error: 'Attendance is required',
        invalid_type_error: 'Attendance must be an array of attendance objects',
      })
      .optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    package: z
      .string({
        invalid_type_error: 'Package must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .optional(),
    active: z
      .boolean({
        invalid_type_error: 'Active must be a boolean',
      })
      .optional(),
    validity: z
      .string({
        invalid_type_error: 'Validity must be a date string',
      })
      .optional(),
    hours: z
      .number({
        invalid_type_error: 'Hours must be a number',
      })
      .optional(),
    piching_machine: z
      .boolean({
        invalid_type_error: 'Piching machine must be a boolean',
      })
      .optional(),
    attendance: z
      .array(attendanceSchema, {
        invalid_type_error: 'Attendance must be an array of attendance objects',
      })
      .optional(),
  }),
});

export const BundleCreditPackageValidations = {
  createValidation,
  updateValidation,
};
