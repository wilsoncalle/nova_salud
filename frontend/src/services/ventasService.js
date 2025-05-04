import { api } from './api';

export const getVentas = async () => {
  try {
    const response = await api.get('/ventas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    throw error;
  }
};

export const getVenta = async (id) => {
  try {
    const response = await api.get(`/ventas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener venta:', error);
    throw error;
  }
};

export const createVenta = async (data) => {
  try {
    const response = await api.post('/ventas', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear venta:', error);
    throw error;
  }
};

export const updateVenta = async (id, data) => {
  try {
    const response = await api.put(`/ventas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    throw error;
  }
};

export const deleteVenta = async (id) => {
  try {
    const response = await api.delete(`/ventas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    throw error;
  }
};

export const getVentasByDateRange = async (startDate, endDate) => {
  try {
    const response = await api.get(`/ventas/fecha/rango?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener ventas por rango de fecha:', error);
    throw error;
  }
};
