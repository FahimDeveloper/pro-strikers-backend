export interface ICustomMembership {
  _id?: string;
  product_id?: string;
  price_id?: string;
  name: string;
  amount: number;
  billing_cycle: 'month' | 'year';
  description: string;
}
