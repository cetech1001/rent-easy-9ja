import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_CONFIG = {
  BASE_URL: __DEV__ ? process.env.API_URL : process.env.REMOTE_API_URL,
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      VERIFY_EMAIL: '/auth/verify-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      PROFILE: '/auth/profile',
    },
    PROPERTIES: {
      BASE: '/properties',
      FEATURED: '/properties/featured',
      MY_PROPERTIES: '/properties/my-properties',
      SAVED: '/properties/saved',
      POPULAR_LOCATIONS: '/properties/popular-locations',
      SAVE: (id: string) => `/properties/${id}/save`,
      UNSAVE: (id: string) => `/properties/${id}/save`,
    },
    APPLICATIONS: {
      BASE: '/applications',
      MY_APPLICATIONS: '/applications/my-applications',
      PROPERTY_APPLICATIONS: '/applications/property-applications',
      STATS: '/applications/stats',
      UPDATE_STATUS: (id: string) => `/applications/${id}/status`,
      WITHDRAW: (id: string) => `/applications/${id}/withdraw`,
    },
  },
};

export class ApiService {
  private static async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  private static async getHeaders(includeAuth: boolean = true): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = await this.getHeaders(includeAuth);

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({message: 'Network error'}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {method: 'GET'}, includeAuth);
  }

  static async post<T>(
    endpoint: string,
    data: any,
    includeAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      includeAuth
    );
  }

  static async put<T>(
    endpoint: string,
    data: any,
    includeAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      includeAuth
    );
  }

  static async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {method: 'DELETE'}, includeAuth);
  }
}
