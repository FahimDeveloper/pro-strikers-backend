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
    event_sport: z.string({
      invalid_type_error: 'event sport must be string',
      required_error: 'event sport is required',
    }),
    start_date: z.string().date(),
    end_date: z.string().date(),
    location: z.string({
      invalid_type_error: 'location must be string',
      required_error: 'location is required',
    }),
    registration_start: z.string().date(),
    registration_end: z.string().date(),
    total_registrations: z.number({
      invalid_type_error: 'total registrations must be number',
      required_error: 'total registrations is required',
    }),
    image: z.string({
      invalid_type_error: 'event image must be string',
      required_error: 'event image is required',
    }),
    event_description: z.string({
      invalid_type_error: 'event description must be string',
      required_error: 'event description is required',
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
    event_sport: z
      .string({
        invalid_type_error: 'event sport must be string',
        required_error: 'event sport is required',
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
    total_registrations: z
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
    event_description: z
      .string({
        invalid_type_error: 'event description must be string',
        required_error: 'event description is required',
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
