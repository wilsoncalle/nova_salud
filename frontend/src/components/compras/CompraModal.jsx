import React from 'react';
import './ComprasStyles.css';

export default function CompraModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="compra-modal-overlay" onClick={onClose}>
      <div className="compra-modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
