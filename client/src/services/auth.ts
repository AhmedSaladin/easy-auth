import api from './api';
import { LoginFormValues, SignupFormValues } from '../types';

export const register = async (userData: SignupFormValues): Promise<{ message: string }> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (
  credentials: LoginFormValues
): Promise<{ message: string; data: { token: string } }> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getHome = async (): Promise<{ message: string; data: { serverUpTime: string } }> => {
  const response = await api.get('/');
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
