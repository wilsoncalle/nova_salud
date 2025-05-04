import React from 'react';
import './ProveedoresStyles.css';

export default function ProveedorCard({ proveedor, onEdit, onDelete, onDetails }) {
  return (
    <div className="proveedor-card">
      <div className="proveedor-card-header">
        <h3>{proveedor.nombre || 'No especificado'}</h3>
      </div>
      <div className="proveedor-card-body">
        <p><strong>RUC:</strong> {proveedor.ruc || 'No especificado'}</p>
        <p><strong>Teléfono:</strong> {proveedor.telefono || 'No especificado'}</p>
      </div>
      <div className="proveedor-card-actions">
        <button onClick={onDetails} className="btn-details">Detalles</button>
        <button onClick={onEdit} className="btn-edit">Editar</button>
        <button onClick={onDelete} className="btn-delete">Eliminar</button>
      </div>
    </div>
  );
}
