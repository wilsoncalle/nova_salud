import React from 'react';
import './ProveedoresStyles.css';

export default function ProveedorDetails({ proveedor, onCancel = () => {} }) {
  if (!proveedor) return null;

  return (
    <div className="proveedor-form">
      <h2>Detalles del Proveedor</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <div className="readonly-field">{proveedor.nombre || 'No especificado'}</div>
        </div>
        <div className="form-group">
          <label>RUC</label>
          <div className="readonly-field">{proveedor.ruc || 'No especificado'}</div>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Teléfono</label>
          <div className="readonly-field">{proveedor.telefono || 'No especificado'}</div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <div className="readonly-field">{proveedor.email || 'No especificado'}</div>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Dirección</label>
          <div className="readonly-field">{proveedor.direccion || 'No especificado'}</div>
        </div>
        <div className="form-group">
          <label>Nombre de Contacto</label>
          <div className="readonly-field">{proveedor.contacto_nombre || 'No especificado'}</div>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Estado</label>
          <div className="readonly-field">{proveedor.estado || 'No especificado'}</div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cerrar</button>
      </div>
    </div>
  );
}
