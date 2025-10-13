export type Role = 'ADMIN' | 'USER' | 'MODERATOR';

export interface ProfileDataType {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}
