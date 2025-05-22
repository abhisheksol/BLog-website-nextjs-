import jwt_decode from 'jwt-decode';
import { User } from '../types';

interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwt_decode<DecodedToken>(token);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token is expired
      return null;
    }
    
    // Return user information
    return {
      _id: decoded.userId,
      username: 'user' // The token doesn't contain username, so we'll need to get it elsewhere
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  return decodeToken(token) !== null;
};