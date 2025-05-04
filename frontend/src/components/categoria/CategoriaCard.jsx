import React from 'react';
import './CategoriaStyles.css';

export default function CategoriaCard({ categoria, onEdit, onDelete, onDetails }) {
  return (
    <div className="categoria-card">
      <div className="categoria-card-content">
        <h4 className="categoria-card-title">{categoria.nombre}</h4>
        {categoria.descripcion && <p className="categoria-card-desc">{categoria.descripcion}</p>}
      </div>
      <div className="categoria-card-actions">
        <button onClick={() => onEdit && onEdit(categoria)} className="btn-edit">Editar</button>
        <button onClick={() => onDelete && onDelete(categoria.categoria_id)} className="btn-delete">Eliminar</button>
      </div>
    </div>
  );
}
