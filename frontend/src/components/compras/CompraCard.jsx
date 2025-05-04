import React from 'react';
import './ComprasStyles.css';

export default function CompraCard({ compra, onEdit, onDelete }) {
  return (
    <div className="compra-card">
      <div className="compra-card-header">
        <span className="compra-card-factura">#{compra.numero_factura}</span>
        <span className="compra-card-total">S/ {parseFloat(compra.total).toFixed(2)}</span>
      </div>
      <div className="compra-card-body">
        <div><strong>Proveedor:</strong> {compra.proveedor_nombre}</div>
        <div><strong>Fecha:</strong> {compra.fecha_compra}</div>
      </div>
      <div className="compra-card-actions">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}
