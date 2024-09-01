import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    course_name: z.string({
      invalid_type_error: 'class name must be string',
      required_error: 'class name is required',
    }),
    sport: z.string({
      invalid_type_error: 'sport must be string',
      required_error: 'sport is required',
    }),
    trainer: z.string({
      invalid_type_error: 'trainer must be string',
      required_error: 'trainer is required',
    }),
    capacity: z.number({
      invalid_type_error: 'capacity must be number',
      required_error: 'capacity is required',
    }),
    enrolled: z
      .number({
        invalid_type_error: 'enrolled must be number',
      })
      .default(0),
    start_date: z.string({
      invalid_type_error: 'start date must be string',
      required_error: 'start date is required',
    }),
    end_date: z.string({
      invalid_type_error: 'end date must be string',
      required_error: 'end date is required',
    }),
    start_time: z.string({
      invalid_type_error: 'start time must be string',
      required_error: 'start time is required',
    }),
    end_time: z.string({
      invalid_type_error: 'end time must be string',
      required_error: 'end time is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    course_name: z
      .string({
        invalid_type_error: 'class name must be string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
      })
      .optional(),
    capacity: z
      .number({
        invalid_type_error: 'capacity must be number',
      })
      .optional(),
    enrolled: z
      .number({
        invalid_type_error: 'enrolled must be number',
      })
      .optional(),
    start_date: z
      .string({
        invalid_type_error: 'start date must be string',
      })
      .optional(),
    end_date: z
      .string({
        invalid_type_error: 'end date must be string',
      })
      .optional(),
    start_time: z
      .string({
        invalid_type_error: 'start time must be string',
      })
      .optional(),
    end_time: z
      .string({
        invalid_type_error: 'end time must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'price must be number',
      })
      .optional(),
  }),
});

export const courseScheduleValidations = {
  createValidation,
  updateValidation,
};
