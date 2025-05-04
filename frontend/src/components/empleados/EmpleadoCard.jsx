import React from 'react';
import './EmpleadosStyles.css';

export default function EmpleadoCard({ empleado, onEdit, onDelete, onDetails }) {
  console.log('Empleado in EmpleadoCard:', empleado);
  return (
    <div className="empleado-card">
      <div className="empleado-card-header">
        <h3>{empleado.nombres || 'No especificado'} {empleado.apellidos || ''}</h3>
      </div>
      <div className="empleado-card-body">
        <p><strong>DNI:</strong> {empleado.dni || 'No especificado'}</p>
        <p><strong>Rol:</strong> {empleado.rol || 'No especificado'}</p>
      </div>
      <div className="empleado-card-actions">
        <button onClick={onDetails} className="btn-details">Detalles</button>
        <button onClick={onEdit} className="btn-edit">Editar</button>
        <button onClick={onDelete} className="btn-delete">Eliminar</button>
      </div>
    </div>
  );
}
