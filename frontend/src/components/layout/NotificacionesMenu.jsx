import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAlertas } from '../../context/AlertasContext';
import './Header.css';

export default function NotificacionesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const alertasContext = useAlertas();
  
  // Si el contexto no está disponible, no renderizar nada
  if (!alertasContext) return null;
  
  // Desestructurar con valores por defecto para evitar errores
  const { 
    notificaciones = [], 
    marcarNotificacionLeida = () => console.warn('marcarNotificacionLeida no disponible'), 
    eliminarNotificacion = () => console.warn('eliminarNotificacion no disponible')
  } = alertasContext;

  // Cerrar el menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar clic en una notificación
  const handleNotificacionClick = (notificacion) => {
    // Marcar como leída
    marcarNotificacionLeida(notificacion.id);
    
    // Navegar a la página de alertas con el ID de la alerta como parámetro de búsqueda
    // Esto permitirá resaltar la alerta específica
    if (notificacion.alerta_id) {
      navigate(`/alertas?highlight=${notificacion.alerta_id}`);
    } else {
      navigate('/alertas');
    }
    
    // Cerrar el menú
    setIsOpen(false);
  };

  // Eliminar notificación
  const handleEliminarNotificacion = (e, id) => {
    e.stopPropagation(); // Evitar que se propague al contenedor
    eliminarNotificacion(id);
  };

  // Obtener el número de notificaciones no leídas
  const noLeidas = notificaciones ? notificaciones.filter(n => !n.leida).length : 0;

  return (
    <div className="notificaciones-container" ref={menuRef}>
      <button 
        className="notificaciones-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificaciones"
      >
        <Bell size={20} />
        {noLeidas > 0 && (
          <span className="notificaciones-badge">{noLeidas}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notificaciones-menu">
          <div className="notificaciones-header">
            <h3>Notificaciones</h3>
            <button 
              className="notificaciones-close"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="notificaciones-content">
            {!notificaciones || notificaciones.length === 0 ? (
              <p className="notificaciones-empty">No hay notificaciones</p>
            ) : (
              notificaciones.map(notificacion => {
                // Asegurarse de que notificacion es un objeto válido
                if (!notificacion || typeof notificacion !== 'object') {
                  console.warn('Notificación inválida:', notificacion);
                  return null;
                }
                
                // Extraer propiedades con valores por defecto
                const {
                  id = `notif-${Math.random().toString(36).substr(2, 9)}`,
                  mensaje = 'Notificación sin mensaje',
                  tipo = 'default',
                  leida = false,
                  fecha = null
                } = notificacion;
                
                // Formatear la fecha si es válida
                let fechaFormateada = 'Fecha no disponible';
                if (fecha && typeof fecha.toLocaleString === 'function') {
                  try {
                    fechaFormateada = fecha.toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  } catch (error) {
                    console.warn('Error al formatear fecha:', error);
                  }
                }
                
                // Generar clase para el indicador
                let tipoClase = 'default';
                if (tipo && typeof tipo === 'string') {
                  tipoClase = tipo.toLowerCase().replace(/\s+/g, '-');
                }
                
                return (
                  <div 
                    key={id}
                    className={`notificacion-item ${leida ? 'leida' : ''}`}
                    onClick={() => handleNotificacionClick(notificacion)}
                  >
                    <div className={`notificacion-indicator ${tipoClase}`}></div>
                    <div className="notificacion-content">
                      <p className="notificacion-mensaje">{mensaje}</p>
                      <span className="notificacion-fecha">{fechaFormateada}</span>
                    </div>
                    <button 
                      className="notificacion-eliminar"
                      onClick={(e) => handleEliminarNotificacion(e, id)}
                      aria-label="Eliminar notificación"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          
          {notificaciones.length > 0 && (
            <div className="notificaciones-footer">
              <button 
                className="notificaciones-ver-todas"
                onClick={() => {
                  navigate('/alertas');
                  setIsOpen(false);
                }}
              >
                Ver todas las alertas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
