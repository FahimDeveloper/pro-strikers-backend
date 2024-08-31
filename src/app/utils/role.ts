export const ROLE = {
  user: 'user',
  superAdmin: 'super-admin',
  admin: 'admin',
  trainer: 'trainer',
  manager: 'manager',
  staff: 'staff',
} as const;

export type IRole =
  | 'user'
  | 'super-admin'
  | 'admin'
  | 'trainer'
  | 'manager'
  | 'staff';
