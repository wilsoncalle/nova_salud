import React from 'react';
import './ProductosStyles.css';

export default function ProductoModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
  background: '#fff',
  borderRadius: '1rem',
  padding: '2rem',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  maxHeight: '90vh',
  overflowY: 'auto',
}}>
        {children}
      </div>
    </div>
  );
} 