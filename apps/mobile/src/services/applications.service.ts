import { ApiService, API_CONFIG } from './api.config';
import {
  Application,
  ApplicationStats,
  ApplicationStatus,
  CreateApplicationRequest,
  UpdateApplicationStatusRequest
} from '@rent-easy-9ja/types';

export class ApplicationsService {
  static async createApplication(data: CreateApplicationRequest): Promise<Application> {
    return ApiService.post(API_CONFIG.ENDPOINTS.APPLICATIONS.BASE, data);
  }

  static async getMyApplications(): Promise<Application[]> {
    return ApiService.get(API_CONFIG.ENDPOINTS.APPLICATIONS.MY_APPLICATIONS);
  }

  static async getPropertyApplications(status?: ApplicationStatus): Promise<Application[]> {
    const endpoint = status
      ? `${API_CONFIG.ENDPOINTS.APPLICATIONS.PROPERTY_APPLICATIONS}?status=${status}`
      : API_CONFIG.ENDPOINTS.APPLICATIONS.PROPERTY_APPLICATIONS;

    return ApiService.get(endpoint);
  }

  static async getApplicationStats(): Promise<ApplicationStats> {
    return ApiService.get(API_CONFIG.ENDPOINTS.APPLICATIONS.STATS);
  }

  static async getApplicationById(id: string): Promise<Application> {
    return ApiService.get(`${API_CONFIG.ENDPOINTS.APPLICATIONS.BASE}/${id}`);
  }

  static async updateApplicationStatus(
    id: string,
    data: UpdateApplicationStatusRequest
  ): Promise<Application> {
    return ApiService.put(API_CONFIG.ENDPOINTS.APPLICATIONS.UPDATE_STATUS(id), data);
  }

  static async withdrawApplication(id: string): Promise<{ message: string }> {
    return ApiService.put(API_CONFIG.ENDPOINTS.APPLICATIONS.WITHDRAW(id), {});
  }
}
