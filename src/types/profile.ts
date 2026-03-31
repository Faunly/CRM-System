export type Role = 'ADMIN' | 'USER' | 'MODERATOR' | 'HUILA';

export interface ProfileDataType {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked?: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface UsersMeta {
  totalAmount: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface UsersData {
  data: ProfileDataType[];
  meta: UsersMeta;
}
