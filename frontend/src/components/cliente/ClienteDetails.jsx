// frontend/src/components/cliente/ClienteDetails.jsx
import React from 'react';
import './ClienteStyles.css';

export default function ClienteDetails({ cliente, onCancel }) {
  if (!cliente) return null;

  return (
    <div className="cliente-details">
      <h2>Detalles del Cliente</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Tipo Documento:</span>
          <span className="detail-value">{cliente.tipo_documento}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Número Documento:</span>
          <span className="detail-value">{cliente.num_documento}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nombres:</span>
          <span className="detail-value">{cliente.nombres}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Apellidos:</span>
          <span className="detail-value">{cliente.apellidos}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Teléfono:</span>
          <span className="detail-value">{cliente.telefono || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{cliente.email || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Dirección:</span>
          <span className="detail-value">{cliente.direccion || 'No especificado'}</span>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cerrar
        </button>
      </div>
    </div>
  );
}