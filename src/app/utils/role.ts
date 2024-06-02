export const ROLE = {
  user: 'user',
  superAdmin: 'super-admin',
  admin: 'admin',
  trainer: 'trainer',
} as const;

export type IRole = 'user' | 'super-admin' | 'admin' | 'trainer';
