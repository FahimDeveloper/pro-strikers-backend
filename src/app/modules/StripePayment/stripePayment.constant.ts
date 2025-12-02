import config from '../../config';

export const priceIds = {
  individual_pro: {
    monthly: config.ind_pro_month,
    yearly: config.ind_pro_year,
    quarterly: config.ind_pro_quarterly,
  },
  individual_pro_unlimited: {
    monthly: config.ind_pro_unlimited_month,
    yearly: config.ind_pro_unlimited_year,
    quarterly: config.ind_pro_unlimited_quarterly,
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

export const membershipsCredits = {
  individual_pro: { machine_credit: '4', session_credit: '4' },
  individual_pro_unlimited: {
    machine_credit: 'unlimited',
    session_credit: 'unlimited',
  },
  // youth_training_membership: { session_credit: '4' },
};

const couponId: any = {
  individual_pro: {
    monthly: config.monthly_coupon,
    quarterly: config.pro_quarterly_coupon,
  },
  individual_pro_unlimited: {
    monthly: config.monthly_coupon,
    quarterly: config.pro_unlimited_quarterly_coupon,
  },
} as const;

export const getCouponId = (membership: Membership, plan: string) => {
  return couponId[membership][plan];
};
