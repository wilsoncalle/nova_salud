import React from 'react';
import './EmpleadosStyles.css';

export default function EmpleadoDetails({ empleado, onCancel = () => {} }) {
  if (!empleado) return null;

  return (
    <div className="empleado-details">
      <h2>Detalles del Empleado</h2>
      <div className="empleado-details-grid">
        <div className="detail-item">
          <span className="detail-label">DNI:</span>
          <span className="detail-value">{empleado.dni || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nombres:</span>
          <span className="detail-value">{empleado.nombres || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Apellidos:</span>
          <span className="detail-value">{empleado.apellidos || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Rol:</span>
          <span className="detail-value">{empleado.rol || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Usuario:</span>
          <span className="detail-value">{empleado.usuario || 'No especificado'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Estado:</span>
          <span className="detail-value">{empleado.estado || 'No especificado'}</span>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
