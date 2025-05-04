import React from 'react';
import './ProveedoresStyles.css';

export default function ProveedorModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 350, boxShadow: '0 4px 20px rgba(0,0,0,0.13)' }}>
        {children}
      </div>
    </div>
  );
}
