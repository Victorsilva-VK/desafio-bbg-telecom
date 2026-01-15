import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor: Antes de cada requisição, coloca o Token no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bbg_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;