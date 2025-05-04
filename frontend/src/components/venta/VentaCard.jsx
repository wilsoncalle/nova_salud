import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VentaStyles.css';

export default function VentaCard({ venta, onDelete, onDetails }) {
  const formatDate = (dateString) => {
    // Si no hay fecha, mostrar mensaje
    if (!dateString) return 'Fecha no disponible';
    
    try {
      // Intentar crear un objeto Date
      let date;
      
      // Verificar si es una cadena ISO o un formato de fecha diferente
      if (typeof dateString === 'string' && dateString.includes('T')) {
        // Es formato ISO, usar directamente
        date = new Date(dateString);
      } else if (typeof dateString === 'string' && dateString.includes('-')) {
        // Formato YYYY-MM-DD
        const parts = dateString.split('-');
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      } else if (typeof dateString === 'string' && dateString.includes('/')) {
        // Formato DD/MM/YYYY
        const parts = dateString.split('/');
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      } else {
        // Intentar con el constructor estándar
        date = new Date(dateString);
      }
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        console.log('Fecha inválida:', dateString);
        return dateString; // Devolver la fecha original como cadena
      }
      
      // Formatear la fecha
      return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) + ' ' + date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error, dateString);
      return dateString; // Devolver la fecha original como cadena
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <div className="venta-card">
      <div className="venta-card-header">
        <h3>Venta #{venta.venta_id}</h3>
        <div className="venta-card-actions">
          <button onClick={() => onDetails(venta.venta_id)} className="btn-details">
            Detalles
          </button>
          <button onClick={() => onDelete(venta.venta_id)} className="btn-delete">
            Eliminar
          </button>
        </div>
      </div>

      <div className="venta-card-content">
        <div className="venta-card-info">
          <p>
            <strong>Cliente:</strong> {venta.cliente_nombres || (venta.cliente_id === 1 ? 'Cliente General' : 'Cliente General')}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(venta.fecha_venta || venta.fecha).toLocaleString('es-PE')}
          </p>
          <p>
            <strong>Comprobante:</strong> {venta.tipo_comprobante} - {venta.num_comprobante}
          </p>
          <p>
            <strong>Método de pago:</strong> {venta.metodo_pago}
          </p>
          <p>
            <strong>Total:</strong> {formatCurrency(venta.total)}
          </p>
        </div>
      </div>

      <div className="venta-card-footer">
        <span className={`venta-status ${venta.estado?.toLowerCase()}`}>
          {venta.estado}
        </span>
      </div>
    </div>
  );
} 