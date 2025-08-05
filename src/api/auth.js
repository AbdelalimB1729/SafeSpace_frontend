import axios from 'axios';
import apiConfig from './apiConfig';

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiConfig.auth}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${apiConfig.auth}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};