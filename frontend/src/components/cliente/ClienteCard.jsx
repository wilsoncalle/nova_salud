import React from 'react';
import './ClienteStyles.css';

export default function ClienteCard({ cliente, onEdit, onDelete, onDetails }) {
  return (
    <div className="cliente-card">
      <div className="card-header">
        <h3>{cliente.nombres} {cliente.apellidos}</h3>
        
      </div>
      <div className="card-content">
      <span className="documento-tag">{cliente.tipo_documento}: {cliente.num_documento}</span>
        <p><strong>Telefono:</strong>{cliente.telefono}</p>
        <p><strong>Email:</strong> {cliente.email || 'Sin email'}</p>
        <p><strong>Dirección:</strong> {cliente.direccion || 'Sin dirección'}</p>
      </div>
      <div className="card-actions">
        <button className="btn-details" onClick={onDetails}>Detalles</button>
        <button className="btn-edit" onClick={onEdit}>Editar</button>
        <button className="btn-delete" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}
