import {User} from "./user";
import {Application} from "./application";

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  STUDIO = 'studio',
  DUPLEX = 'duplex',
  COMMERCIAL = 'commercial',
  LAND = 'land',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
  DRAFT = 'draft',
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  images: string[];
  amenities: Amenities;
  status: PropertyStatus;
  isActive: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  landlord: User;
  landlordId: string;
  applications: Application[];
  savedByUsers: SavedProperty[];
}

export interface Amenities {
  furnished: boolean;
  ac: boolean;
  security: boolean;
  parking: boolean;
  wifi: boolean;
  gym: boolean;
  pool: boolean;
  generator: boolean;
}

export interface SavedProperty {
  id: string;
  createdAt: Date;
  user: User;
  userId: string;
  property: Property;
  propertyId: string;
}

export interface PropertyQueryParams {
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  status?: PropertyStatus;
  search?: string;
}

export interface CreatePropertyRequest {
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  address: string;
  city: string;
  state: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  parking?: number;
  images?: string[];
  amenities?: Amenities;
  status?: PropertyStatus;
}

export interface PropertiesResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PopularLocation {
  city: string;
  state: string;
  count: number;
}
