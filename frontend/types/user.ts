import { Role } from '@/enums';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email: string;
  dob: string;
  avatar_url?: string;
  bin: string;
  banknum: string;
  name: string; // tên chủ tài khoản ngân hàng
  available_balance: number;
  roles: Role[];
  addresses: Address[];
}

export interface Address {
  id: number;
  ward: string;
  district: string;
  description: string;
  is_default: boolean;
}