import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    event_name: z.string({
      invalid_type_error: 'event name must be string',
      required_error: 'event name is required',
    }),
    event_type: z.string({
      invalid_type_error: 'event type must be string',
      required_error: 'event type is required',
    }),
    sport: z.string({
      invalid_type_error: 'sport must be string',
      required_error: 'sport is required',
    }),
    start_date: z.string(),
    end_date: z.string(),
    location: z.string({
      invalid_type_error: 'location must be string',
      required_error: 'location is required',
    }),
    registration_start: z.string(),
    registration_end: z.string(),
    registration: z
      .number({
        invalid_type_error: 'total registrations must be number',
      })
      .default(0),
    image: z.any().optional(),
    allowed_registrations: z.number({
      invalid_type_error: 'allowed registrations must be number',
      required_error: 'allowed registrations is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be boolean',
        required_error: 'isDeleted is required',
      })
      .default(false),
  }),
});

const updateValidation = z.object({
  body: z.object({
    event_name: z
      .string({
        invalid_type_error: 'event name must be string',
      })
      .optional(),
    event_type: z
      .string({
        invalid_type_error: 'event type must be string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
      })
      .optional(),
    start_date: z.string(),
    end_date: z.string(),
    location: z
      .string({
        invalid_type_error: 'location must be string',
      })
      .optional(),
    registration_start: z.string(),
    registration_end: z.string(),
    registration: z
      .number({
        invalid_type_error: 'total registrations must be number',
      })
      .optional(),
    image: z.any().optional(),
    allowed_registrations: z
      .number({
        invalid_type_error: 'allowed registrations must be number',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be boolean',
      })
      .optional()
      .default(false),
    price: z
      .number({
        invalid_type_error: 'price must be number',
        required_error: 'price is required',
      })
      .optional(),
  }),
});

export const EventValidations = {
  createValidation,
  updateValidation,
};
