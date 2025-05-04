import React from 'react';
import './AlertasStyles.css';

export default function AlertaCard({ alerta, producto, onResolve, onDelete, isHighlighted = false, setRef }) {
  const tipoColor = {
    'Stock Bajo': '#ff9800',
    'Sin Stock': '#f44336',
    'Próximo a Vencer': '#2196f3'
  };
  
  // Obtener el color según el tipo de alerta
  const alertColor = tipoColor[alerta.tipo_alerta] || '#0073ff';
  
  // Efecto de resaltado con animación
  const highlightStyle = isHighlighted ? {
    animation: 'highlight-pulse 2s ease-in-out',
    boxShadow: `0 0 15px ${alertColor}`,
    transform: 'scale(1.02)',
    transition: 'all 0.3s ease'
  } : {};
  
  return (
    <div 
      ref={setRef} 
      className={`alerta-card ${isHighlighted ? 'highlighted' : ''}`} 
      style={{ 
        borderTop: `3px solid ${alertColor}`,
        ...highlightStyle
      }}>
      <div className="alerta-card-header" style={{ backgroundColor: `${alertColor}15` }}>
        <span className="alerta-tipo" style={{ color: alertColor, background: 'transparent' }}>{alerta.tipo_alerta}</span>
        <span className={`alerta-estado ${alerta.estado === 'Activa' ? 'activa' : 'resuelta'}`}>{alerta.estado}</span>
      </div>
      <div className="alerta-card-body">
        <div className="alerta-producto"><strong>Producto:</strong> {producto?.nombre || alerta.producto_nombre}</div>
        <div className="alerta-mensaje">{alerta.mensaje}</div>
        <div className="alerta-fecha"><strong>Generado:</strong> {new Date(alerta.fecha_generacion).toLocaleString()}</div>
      </div>
      <div className="alerta-card-actions">
        {alerta.estado === 'Activa' && (
          <button className="btn-resolver" onClick={() => onResolve(alerta.alerta_id)}>Resuelta</button>
        )}
        <button className="btn-eliminar" onClick={() => onDelete(alerta.alerta_id)}>Eliminar</button>
      </div>
    </div>
  );
}
