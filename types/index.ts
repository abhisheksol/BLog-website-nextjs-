export interface User {
  _id: string;
  username: string;
}

export interface Blog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  createdBy: User | string;
  likes?: string[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  likedByUser: boolean;
}

export interface ApiResponse {
  message: string;
}

export interface RegisterResponse extends ApiResponse {
  user: User & { password: string; __v: number };
}

export interface LoginResponse extends ApiResponse {
  token: string;
}

export interface LikeResponse extends ApiResponse {
  likesCount: number;
  likedByUser: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}