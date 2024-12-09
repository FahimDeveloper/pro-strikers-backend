import { z } from 'zod';

const timeSchema = z.object({
  hour: z
    .number({
      required_error: 'Hour is required',
      invalid_type_error: 'Hour must be a number',
    })
    .int('Hour must be an integer'),
  start_time: z.date({
    required_error: 'Start time is required',
    invalid_type_error: 'Start time must be a valid date',
  }),
  end_time: z.date({
    required_error: 'End time is required',
    invalid_type_error: 'End time must be a valid date',
  }),
});

const attendanceSchema = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a valid date',
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
    user: z.string({
      required_error: 'User is required',
      invalid_type_error: 'User must be a string',
    }),
    active: z.boolean({
      required_error: 'Active is required',
      invalid_type_error: 'Active must be a boolean',
    }),
    validity: z.date({
      required_error: 'Validity is required',
      invalid_type_error: 'Validity must be a valid date',
    }),
    hours: z.number({
      required_error: 'Hours is required',
      invalid_type_error: 'Hours must be a number',
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
    // package: z
    //   .string({
    //     invalid_type_error: 'Package must be a string',
    //   })
    //   .optional(),
    // user: z
    //   .string({
    //     invalid_type_error: 'User must be a string',
    //   })
    //   .optional(),
    // active: z
    //   .boolean({
    //     invalid_type_error: 'Active must be a boolean',
    //   })
    //   .optional(),
    // validity: z
    //   .date({
    //     invalid_type_error: 'Validity must be a valid date',
    //   })
    //   .optional(),
    // hours: z
    //   .number({
    //     invalid_type_error: 'Hours must be a number',
    //   })
    //   .optional(),
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
