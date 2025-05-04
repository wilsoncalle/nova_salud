import React from 'react';
import { FaPrescription, FaRegTimesCircle } from 'react-icons/fa';
import './ProductosStyles.css';

export default function ProductoCard({ producto, onEdit, onDelete, onDetails }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      'Activo': { color: '#4caf50', text: 'Activo' },
      'Descontinuado': { color: '#f44336', text: 'Descontinuado' },
      'Agotado': { color: '#ff9800', text: 'Agotado' }
    };
    const estadoInfo = estados[estado] || estados['Activo'];
    return (
      <span className="estado-badge" style={{ backgroundColor: estadoInfo.color }}>
        {estadoInfo.text}
      </span>
    );
  };

  return (
    <div className="producto-card">
      <div className="producto-card-content">
        <div className="producto-card-header">
          <h4 className="producto-card-title">{producto.nombre}</h4>
          {producto.requiere_receta ? (
            <span className="receta-badge" title="Requiere receta médica">
              <FaPrescription />
            </span>
          ) : (
            <span className="no-receta-badge" title="No requiere receta médica">
              <FaRegTimesCircle />
            </span>
          )}
        </div>
        <div className="producto-card-details">
          <p><strong>Código:</strong> {producto.codigo}</p>
          <p><strong>Categoría:</strong> {producto.categoria_nombre || 'Sin categoría'}</p>
          <p><strong>Proveedor:</strong> {producto.proveedor_nombre || 'Sin proveedor'}</p>
          <div className="producto-card-precios">
            <p><strong>Precio Compra:</strong> ${producto.precio_compra}</p>
            <p><strong>Precio Venta:</strong> ${producto.precio_venta}</p>
          </div>
          <div className="producto-card-stock">
            <p><strong>Stock Actual:</strong> {producto.stock_actual}</p>
            <p><strong>Stock Mínimo:</strong> {producto.stock_minimo}</p>
          </div>
          <p><strong>Fecha Vencimiento:</strong> {formatDate(producto.fecha_vencimiento)}</p>
          {producto.descripcion && <p className="producto-card-desc">{producto.descripcion}</p>}
        </div>
        <div className="producto-card-footer">
          {getEstadoBadge(producto.estado)}
        </div>
      </div>
      <div className="producto-card-actions">
        <button onClick={() => onEdit && onEdit(producto)} className="btn-edit">Editar</button>
        <button onClick={() => onDelete && onDelete(producto.producto_id)} className="btn-delete">Eliminar</button>
      </div>
    </div>
  );
}