import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService, API_CONFIG } from './api.config';
import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest, ResetPasswordRequest, UpdateProfileRequest,
  UserProfile,
  VerifyEmailRequest
} from '@rent-easy-9ja/types';



export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly USER_KEY = 'userData';

  static async register(data: RegisterRequest): Promise<{ message: string; user: UserProfile }> {
    return ApiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data, false);
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await ApiService.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      data,
      false
    );

    await AsyncStorage.setItem(this.TOKEN_KEY, response.access_token);
    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

    return response;
  }

  static async verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
    return ApiService.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, data, false);
  }

  static async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    return ApiService.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, data, false);
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    return ApiService.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, data, false);
  }

  static async getProfile(): Promise<UserProfile> {
    return ApiService.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  }

  static async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const updatedUser = await ApiService.put<UserProfile>(
      API_CONFIG.ENDPOINTS.AUTH.PROFILE,
      data
    );

    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  }

  static async logout(): Promise<void> {
    await AsyncStorage.multiRemove([this.TOKEN_KEY, this.USER_KEY]);
  }

  static async getStoredToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  static async getStoredUser(): Promise<UserProfile | null> {
    const userData = await AsyncStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    return !!token;
  }

  static async refreshUserData(): Promise<UserProfile> {
    const user = await this.getProfile();
    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return user;
  }
}
