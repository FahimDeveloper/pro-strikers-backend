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

type PriceIds = typeof priceIds;
type Membership = keyof PriceIds;
type PlanFor<M extends Membership> = keyof PriceIds[M];

export const getPriceId = <M extends Membership>(
  membership: M,
  plan: PlanFor<M>,
) => {
  return priceIds[membership][plan];
};
