import React from "react";
import './VentaStyles.css';

const VentaModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="venta-modal-overlay">
      <div className="venta-modal">
        <div className="venta-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default VentaModal;
