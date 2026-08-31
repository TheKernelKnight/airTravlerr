import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchFlights = async (data: any) => {
  const response = await apiClient.post('/search', data);
  return response.data;
};

export const createBooking = async (data: any) => {
  const response = await apiClient.post('/booking', data);
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await apiClient.post('/newsletter/subscribe', { email });
  return response.data;
};