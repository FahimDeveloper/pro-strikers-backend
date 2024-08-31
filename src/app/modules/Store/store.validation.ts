import { z } from 'zod';

const priceVariationsSchema = z.object({
  variation_type: z
    .string({
      invalid_type_error: 'variation type is must be a string',
    })
    .optional(),
  variation_value: z
    .string({
      invalid_type_error: 'variation value is must be a string',
    })
    .optional(),
  variation_price: z
    .number({
      invalid_type_error: 'variation price is must be a number',
    })
    .optional(),
});

const nonPriceVariationsSchema = z.object({
  variation_type: z
    .string({
      invalid_type_error: 'variation type is must be a string',
    })
    .optional(),
  variation_value: z
    .array(
      z.string({
        invalid_type_error: 'variation value is must be a string',
      }),
    )
    .optional(),
});

const createValidation = z.object({
  body: z.object({
    product_name: z.string({
      required_error: 'product name is required',
      invalid_type_error: 'product name is must be a string',
    }),
    images: z.any(),
    price: z.number({
      required_error: 'price is required',
      invalid_type_error: 'price is must be a number',
    }),
    category: z.string({
      required_error: 'category is required',
      invalid_type_error: 'category is must be a string',
    }),
    color: z.string({
      required_error: 'color is required',
      invalid_type_error: 'color is must be a string',
    }),
    size: z.string({
      required_error: 'size is required',
      invalid_type_error: 'size is must be a string',
    }),
    description: z.string({
      required_error: 'description is required',
      invalid_type_error: 'description is must be a string',
    }),
    price_variation: z.boolean({
      required_error: 'price variation is required',
      invalid_type_error: 'price variation is must be a boolean',
    }),
    price_variations: z.array(priceVariationsSchema).optional(),
    non_price_variation: z.boolean({
      required_error: 'non price variation is required',
      invalid_type_error: 'non price variation is must be a boolean',
    }),
    non_price_variations: z.array(nonPriceVariationsSchema).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    product_name: z
      .string({
        required_error: 'product name is required',
        invalid_type_error: 'product name is must be a string',
      })
      .optional(),
    images: z.any().optional(),
    price: z
      .number({
        required_error: 'price is required',
        invalid_type_error: 'price is must be a number',
      })
      .optional(),
    category: z
      .string({
        required_error: 'category is required',
        invalid_type_error: 'category is must be a string',
      })
      .optional(),
    color: z
      .string({
        required_error: 'color is required',
        invalid_type_error: 'color is must be a string',
      })
      .optional(),
    size: z
      .string({
        required_error: 'size is required',
        invalid_type_error: 'size is must be a string',
      })
      .optional(),
    description: z
      .string({
        required_error: 'description is required',
        invalid_type_error: 'description is must be a string',
      })
      .optional(),
    price_variation: z
      .boolean({
        required_error: 'price variation is required',
        invalid_type_error: 'price variation is must be a boolean',
      })
      .optional(),
    price_variations: z.array(priceVariationsSchema).optional(),
    non_price_variation: z.boolean({
      required_error: 'non price variation is required',
      invalid_type_error: 'non price variation is must be a boolean',
    }),
    non_price_variations: z.array(nonPriceVariationsSchema).optional(),
  }),
});

export const StoreValidations = {
  createValidation,
  updateValidation,
};
