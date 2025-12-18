export interface IAcademyMembership {
  email: string;
  customer_id: string;
  subscription_id: string;
  subscription_plan: string;
  invoice_count: number;
  is_offer_subscription: {
    applied: boolean;
    coupon?: string;
  };
  subscription: string;
}
