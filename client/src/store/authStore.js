import { create } from 'zustand';
import api from '../api/axios';

export const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    set({ user: res.data.user, token: res.data.token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
