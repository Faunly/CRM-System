export interface BackendRegisterPayload {
  username: string;
  login: string;
  password: string;
  email: string;
  phone?: string;
}

export interface FormConfirm {
  confirm: string;
}

export type UserRegistration = BackendRegisterPayload & FormConfirm;

export interface LoginTypes {
  login: string;
  password: string;
}
