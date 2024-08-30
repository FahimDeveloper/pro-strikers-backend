import { z } from 'zod';

const createAddonValidation = z.object({
  addon_title: z.string({
    invalid_type_error: 'Addon title must be a string',
    required_error: 'Addon title is required',
  }),
  addon_description: z.string({
    invalid_type_error: 'Addon Description must be a string',
    required_error: 'Addon Description is required',
  }),
  addon_price: z.number({
    invalid_type_error: 'Addon Price must be a number',
    required_error: 'Addon Price is required',
  }),
});

const updateAddonValidation = z.object({
  addon_title: z
    .string({
      invalid_type_error: 'Addon title must be a string',
    })
    .optional(),
  addon_description: z
    .string({
      invalid_type_error: 'Addon Description must be a string',
    })
    .optional(),
  addon_price: z
    .number({
      invalid_type_error: 'Addon Price must be a number',
    })
    .optional(),
});

const createValidation = z.object({
  body: z.object({
    lane_title: z.string({
      invalid_type_error: 'Lane title must be a string',
      required_error: 'Lane title is required',
    }),
    description: z.string({
      invalid_type_error: 'Description must be a string',
      required_error: 'Description is required',
    }),
    addon: z.boolean({
      invalid_type_error: 'Addon must be a boolean',
      required_error: 'Addon is required',
    }),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be boolean',
        required_error: 'isDeleted is required',
      })
      .default(false),
    addons: z.array(createAddonValidation).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    lane_title: z
      .string({
        invalid_type_error: 'Lane title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    addon: z
      .boolean({
        invalid_type_error: 'Addon must be a boolean',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be boolean',
      })
      .optional()
      .default(false),
    addons: z.array(updateAddonValidation).optional(),
  }),
});

export const LaneValidations = {
  createValidation,
  updateValidation,
};
