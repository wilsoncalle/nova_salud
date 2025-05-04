import { api } from './api';

export const getAlertas = () => api.get('/alertas');
export const getAlerta = (id) => api.get(`/alertas/${id}`);
export const createAlerta = (data) => api.post('/alertas', data);
export const updateAlerta = (id, data) => api.put(`/alertas/${id}`, data);
export const deleteAlerta = (id) => api.delete(`/alertas/${id}`);

