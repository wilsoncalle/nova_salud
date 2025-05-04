import { api } from './api';

export const getCompras = () => api.get('/compras');
export const getCompra = (id) => api.get(`/compras/${id}`);
export const createCompra = (data) => api.post('/compras', data);
export const updateCompra = (id, data) => api.put(`/compras/${id}`, data);
export const deleteCompra = (id) => api.delete(`/compras/${id}`);