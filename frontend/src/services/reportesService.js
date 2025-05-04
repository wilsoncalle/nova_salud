import { api } from './api';

export const getVentasPorFecha = (params) => api.get('/reportes/ventas-por-fecha', { params });
export const getComprasPorProveedor = (params) => api.get('/reportes/compras-por-proveedor', { params });
export const getProductosBajoStock = () => api.get('/reportes/productos-bajo-stock');
