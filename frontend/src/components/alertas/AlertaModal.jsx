import React from 'react';
import './AlertaModal.css';

export default function AlertaModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="alerta-modal-overlay">
      <div className="alerta-modal">
        <button className="alerta-modal-close" onClick={onClose}>&times;</button>
        <div className="alerta-modal-content">{children}</div>
      </div>
    </div>
  );
}
