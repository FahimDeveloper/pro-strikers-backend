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
    start_date: z.string().date(),
    end_date: z.string().date(),
    location: z.string({
      invalid_type_error: 'location must be string',
      required_error: 'location is required',
    }),
    registration_start: z.string().date(),
    registration_end: z.string().date(),
    registration: z.number({
      invalid_type_error: 'total registrations must be number',
      required_error: 'total registrations is required',
    }),
    image: z
      .string({
        invalid_type_error: 'event image must be string',
        required_error: 'event image is required',
      })
      .optional(),
    allowed_registrations: z.string({
      invalid_type_error: 'allowed registrations must be string',
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
  }),
});

const updateValidation = z.object({
  body: z.object({
    event_name: z
      .string({
        invalid_type_error: 'event name must be string',
        required_error: 'event name is required',
      })
      .optional(),
    event_type: z
      .string({
        invalid_type_error: 'event type must be string',
        required_error: 'event type is required',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
        required_error: 'sport is required',
      })
      .optional(),
    start_date: z.string().date(),
    end_date: z.string().date(),
    location: z
      .string({
        invalid_type_error: 'location must be string',
        required_error: 'location is required',
      })
      .optional(),
    registration_start: z.string().date(),
    registration_end: z.string().date(),
    registration: z
      .number({
        invalid_type_error: 'total registrations must be number',
        required_error: 'total registrations is required',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'event image must be string',
        required_error: 'event image is required',
      })
      .optional(),
    allowed_registrations: z
      .string({
        invalid_type_error: 'allowed registrations must be string',
        required_error: 'allowed registrations is required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
        required_error: 'description is required',
      })
      .optional(),
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
