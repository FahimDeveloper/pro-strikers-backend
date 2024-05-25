export const ROLE = {
  user: 'user',
  superAdmin: 'superAdmin',
  admin: 'admin',
  trainer: 'trainer',
} as const;

export type IRole = keyof typeof ROLE;
