import {User} from "./user";
import {Property} from "./property";

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export interface Application {
  id: string;
  message: string;
  documents: {
    idCard: string;
    proofOfIncome: string;
    references: string[];
  };
  status: ApplicationStatus;
  landlordNotes: string;
  createdAt: Date;
  updatedAt: Date;
  tenant: User;
  tenantId: string;
  property: Property;
  propertyId: string;
}

export interface CreateApplicationRequest {
  propertyId: string;
  message?: string;
  documents?: {
    idCard?: string;
    proofOfIncome?: string;
    references?: string[];
  };
}

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
  landlordNotes?: string;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  withdrawn: number;
}
