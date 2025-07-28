import config from '../../config';

export const priceIds = {
  individual_pro: {
    monthly: config.ind_pro_month,
    yearly: config.ind_pro_year,
  },
  individual_pro_unlimited: {
    monthly: config.ind_pro_unlimited_month,
    yearly: config.ind_pro_unlimited_year,
  },
  youth_training_membership: {
    monthly: config.youth_training_month,
  },
} as const;
