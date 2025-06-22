import { ApiService, API_CONFIG } from './api.config';
import {
  PropertyStatus,
  PropertyQueryParams,
  PropertiesResponse,
  Property,
  PopularLocation, CreatePropertyRequest
} from '@rent-easy-9ja/types';

export class PropertiesService {
  static async getProperties(params?: PropertyQueryParams): Promise<PropertiesResponse> {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    const endpoint = queryString
      ? `${API_CONFIG.ENDPOINTS.PROPERTIES.BASE}?${queryString}`
      : API_CONFIG.ENDPOINTS.PROPERTIES.BASE;

    return ApiService.get(endpoint);
  }

  static async getPropertyById(id: string): Promise<Property> {
    return ApiService.get(`${API_CONFIG.ENDPOINTS.PROPERTIES.BASE}/${id}`);
  }

  static async getFeaturedProperties(limit?: number): Promise<Property[]> {
    const endpoint = limit
      ? `${API_CONFIG.ENDPOINTS.PROPERTIES.FEATURED}?limit=${limit}`
      : API_CONFIG.ENDPOINTS.PROPERTIES.FEATURED;

    return ApiService.get(endpoint);
  }

  static async getPopularLocations(): Promise<PopularLocation[]> {
    return ApiService.get(API_CONFIG.ENDPOINTS.PROPERTIES.POPULAR_LOCATIONS, false);
  }

  static async getMyProperties(status?: PropertyStatus): Promise<Property[]> {
    const endpoint = status
      ? `${API_CONFIG.ENDPOINTS.PROPERTIES.MY_PROPERTIES}?status=${status}`
      : API_CONFIG.ENDPOINTS.PROPERTIES.MY_PROPERTIES;

    return ApiService.get(endpoint);
  }

  static async getSavedProperties(): Promise<Property[]> {
    return ApiService.get(API_CONFIG.ENDPOINTS.PROPERTIES.SAVED);
  }

  static async createProperty(data: CreatePropertyRequest): Promise<Property> {
    return ApiService.post(API_CONFIG.ENDPOINTS.PROPERTIES.BASE, data);
  }

  static async updateProperty(id: string, data: Partial<CreatePropertyRequest>): Promise<Property> {
    return ApiService.put(`${API_CONFIG.ENDPOINTS.PROPERTIES.BASE}/${id}`, data);
  }

  static async deleteProperty(id: string): Promise<{ message: string }> {
    return ApiService.delete(`${API_CONFIG.ENDPOINTS.PROPERTIES.BASE}/${id}`);
  }

  static async saveProperty(id: string): Promise<{ message: string }> {
    return ApiService.post(API_CONFIG.ENDPOINTS.PROPERTIES.SAVE(id), {});
  }

  static async unsaveProperty(id: string): Promise<{ message: string }> {
    return ApiService.delete(API_CONFIG.ENDPOINTS.PROPERTIES.UNSAVE(id));
  }

  static async searchProperties(searchTerm: string, filters?: PropertyQueryParams): Promise<PropertiesResponse> {
    const params = {
      search: searchTerm,
      ...filters,
    };

    return this.getProperties(params);
  }
}
