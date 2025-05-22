import axios, { AxiosError } from 'axios';
import { Blog, LoginResponse, RegisterResponse, LikeResponse } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = async (userData: { username: string; password: string }): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Registration failed' };
  }
};

export const loginUser = async (userData: { username: string; password: string }): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Login failed' };
  }
};

// Blog API calls
export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await api.get<Blog[]>('/blogs/getAll');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Failed to fetch blogs' };
  }
};

export const getUserBlogs = async (): Promise<Blog[]> => {
  try {
    console.log('API: Fetching user blogs');
    
    // Get token directly from localStorage
    const token = localStorage.getItem('token');
    console.warn('API: Token retrieved from localStorage:', token);
    
    
    if (!token) {
      console.error('API: No token found in localStorage for getUserBlogs');
      throw new Error('Authentication token not found');
    }
    
    console.log('API: Using token:', token.substring(0, 15) + '...');
    
    // Explicitly set the Authorization header for this specific request
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const response = await api.get<Blog[]>('/blogs/getByUser', config);
    console.log('API: User blogs fetched successfully, count:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('API: Error fetching user blogs:', error);
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Failed to fetch user blogs' };
  }
};

export const addBlog = async (blogData: { title: string; desc: string; image: string }): Promise<Blog> => {
  try {
    const response = await api.post<Blog>('/blogs/add', blogData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Failed to add blog' };
  }
};

export const likeBlog = async (blogId: string): Promise<LikeResponse> => {
  try {
    const response = await api.post<LikeResponse>(`/blogs/like/${blogId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data || { message: 'Failed to like blog' };
  }
};