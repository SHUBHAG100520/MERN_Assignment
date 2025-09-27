import { create } from 'zustand';
import api from '../api/axios';

export const useTasks = create((set, get) => ({
  items: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  filters: { search: '', status: '', priority: '', mine: true },
  fetch: async () => {
    const { page, limit, filters } = get();
    const res = await api.get('/tasks', { params: { page, limit, ...filters } });
    set({ items: res.data.data, totalPages: res.data.totalPages });
  },
  create: async (payload) => {
    await api.post('/tasks', payload);
    await get().fetch();
  },
  update: async (id, payload) => {
    await api.patch(`/tasks/${id}`, payload);
    await get().fetch();
  },
  remove: async (id) => {
    await api.delete(`/tasks/${id}`);
    await get().fetch();
  },
  setPage: (p) => set({ page: p }),
  setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f }, page: 1 }))
}));
