export interface IMembershipCancellation {
  email: string;
  package_name: string;
  plan: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'deny';
}
