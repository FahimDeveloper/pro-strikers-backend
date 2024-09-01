export interface IVoucher {
  voucher_type: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  voucher_code: string;
  used: number;
  description: string;
}
