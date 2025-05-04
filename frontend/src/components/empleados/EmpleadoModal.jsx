import React from 'react';
import EmpleadoDetails from './EmpleadoDetails';
import EmpleadoForm from './EmpleadoForm';
import './EmpleadosStyles.css';

export default function EmpleadoModal({ isOpen, onClose, empleado, onSubmit, children }) {
  if (!isOpen) return null;

  return (
    <div className="empleado-modal-overlay">
      <div className="empleado-modal">
        <div className="empleado-modal-header">
          <h2>{onSubmit ? 'Formulario de Empleado' : 'Detalles del Empleado'}</h2>
        </div>
        <div className="empleado-modal-body">
          {children ? children : <EmpleadoDetails empleado={empleado} />}
        </div>
      </div>
    </div>
  );
}
