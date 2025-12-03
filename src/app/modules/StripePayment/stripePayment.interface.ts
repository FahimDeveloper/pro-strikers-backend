export interface IStripePayment {
  email: string;
  customer_id: string;
  subscription_id: string;
  subscription_plan: string;
  invoice_count: number;
  subscription: string;
}
