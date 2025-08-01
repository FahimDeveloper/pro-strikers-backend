interface ITempLink {
  type: 'facility' | 'appointment' | 'class' | 'course' | 'membership';
  token: string;
  expiresAt?: Date;
}
