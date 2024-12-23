import { z } from 'zod';

const createAddonValidation = z.object({
  addon_title: z.string({
    invalid_type_error: 'Addon title must be a string',
    required_error: 'Addon title is required',
  }),
  // addon_manage: z.enum(['hourly', 'half_hourly'], {
  //   invalid_type_error: 'Addon Manage must be a valid enum value',
  //   required_error: 'Addon Manage is required',
  // }),
  addon_description: z.string({
    invalid_type_error: 'Addon Description must be a string',
    required_error: 'Addon Description is required',
  }),
  addon_price: z.number({
    invalid_type_error: 'Addon Price must be a number',
    required_error: 'Addon Price is required',
  }),
  addon_ini_price: z.number({
    invalid_type_error: 'Addon Initial Price must be a number',
    required_error: 'Addon Initial Price is required',
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
  // addon_manage: z
  //   .enum(['hourly', 'half_hourly'], {
  //     invalid_type_error: 'Addon Manage must be a valid enum value',
  //   })
  //   .optional(),
  addon_price: z
    .number({
      invalid_type_error: 'Addon Price must be a number',
    })
    .optional(),
  addon_ini_price: z
    .number({
      invalid_type_error: 'Addon Initial Price must be a number',
    })
    .optional(),
});

const createValidation = z.object({
  body: z.object({
    sport: z.string({
      invalid_type_error: 'sport must be a string',
      required_error: 'sport is required',
    }),
    facility: z.string({
      invalid_type_error: 'facility must be a string',
      required_error: 'facility is required',
    }),
    addons: z.array(createAddonValidation, {
      required_error: 'addons is required',
      invalid_type_error: 'addon must be array of object',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    sport: z
      .string({
        invalid_type_error: 'sport must be a string',
      })
      .optional(),
    facility: z
      .string({
        invalid_type_error: 'facility must be a string',
      })
      .optional(),
    new_addons: z.array(updateAddonValidation.optional()).optional(),
    old_addons: z.array(updateAddonValidation.optional()).optional(),
  }),
});

export const AddonValidations = {
  createValidation,
  updateValidation,
};
