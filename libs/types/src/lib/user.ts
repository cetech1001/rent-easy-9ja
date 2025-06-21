import {Property, SavedProperty} from "./property";
import {Application} from "./application";

export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  SUSPENDED = 'suspended',
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  emailVerified: boolean;
  emailVerificationToken: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  properties: Property[];
  applications: Application[];
  savedProperties: SavedProperty[];
}
