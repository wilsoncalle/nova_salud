import React from 'react';
import './ClienteStyles.css';

export default function ClienteModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="cliente-modal-overlay">
      <div className="cliente-modal">
        <div className="modal-header">
          <h2>Gestión de Clientes</h2>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
