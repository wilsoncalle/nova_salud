import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAlertas, createAlerta } from '../services/alertasService';

// Crear el contexto
const AlertasContext = createContext();

// Hook personalizado para usar el contexto
export const useAlertas = () => useContext(AlertasContext);

// Proveedor del contexto
// Función auxiliar para obtener notificaciones leídas del localStorage
const getNotificacionesLeidas = () => {
  try {
    const leidas = localStorage.getItem('notificacionesLeidas');
    return leidas ? JSON.parse(leidas) : [];
  } catch (error) {
    console.error('Error al leer notificaciones leídas:', error);
    return [];
  }
};

// Función auxiliar para guardar notificaciones leídas en localStorage
const saveNotificacionesLeidas = (ids) => {
  try {
    localStorage.setItem('notificacionesLeidas', JSON.stringify(ids));
  } catch (error) {
    console.error('Error al guardar notificaciones leídas:', error);
  }
};

export const AlertasProvider = ({ children }) => {
  const [alertas, setAlertas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesLeidas, setNotificacionesLeidas] = useState(getNotificacionesLeidas());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar alertas al iniciar
  useEffect(() => {
    fetchAlertas();
  }, []);

  // Función para obtener todas las alertas
  const fetchAlertas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAlertas();
      
      if (response && response.data) {
        setAlertas(response.data);
        
        // Filtrar alertas no resueltas para mostrarlas como notificaciones
        const nuevasNotificaciones = response.data
          .filter(alerta => alerta.estado === 'Activa')
          .map(alerta => ({
            id: alerta.alerta_id,
            alerta_id: alerta.alerta_id, // Guardar el ID original de la alerta para navegación
            mensaje: alerta.mensaje,
            tipo: alerta.tipo,
            // Convertir la fecha a un formato seguro para evitar 'Invalid Date'
            fecha: alerta.fecha_creacion ? new Date(alerta.fecha_creacion.replace(/-/g, '/')) : new Date(),
            fecha_texto: alerta.fecha_creacion ? new Date(alerta.fecha_creacion.replace(/-/g, '/')).toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Fecha no disponible',
            // Marcar como leída si está en la lista de notificaciones leídas
            leida: notificacionesLeidas.includes(alerta.alerta_id)
          }));
        
        setNotificaciones(nuevasNotificaciones);
      }
    } catch (err) {
      console.error('Error al cargar alertas:', err);
      setError('No se pudieron cargar las alertas');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva alerta
  const crearAlerta = async (data) => {
    try {
      const response = await createAlerta(data);
      
      if (response && response.data) {
        // Actualizar la lista de alertas
        setAlertas(prevAlertas => [...prevAlertas, response.data]);
        
        // Agregar a notificaciones si es una alerta activa
        if (response.data.estado === 'Activa') {
          const nuevaNotificacion = {
            id: response.data.alerta_id,
            alerta_id: response.data.alerta_id,
            mensaje: response.data.mensaje,
            tipo: response.data.tipo,
            // Convertir la fecha a un formato seguro para evitar 'Invalid Date'
            fecha: response.data.fecha_creacion ? new Date(response.data.fecha_creacion.replace(/-/g, '/')) : new Date(),
            fecha_texto: response.data.fecha_creacion ? new Date(response.data.fecha_creacion.replace(/-/g, '/')).toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Fecha no disponible',
            leida: false
          };
          
          setNotificaciones(prevNotificaciones => [
            nuevaNotificacion,
            ...prevNotificaciones
          ]);
        }
        
        return response.data;
      }
    } catch (err) {
      console.error('Error al crear alerta:', err);
      throw err;
    }
  };

  // Función para crear alerta de stock bajo
  const crearAlertaStockBajo = async (producto, stockActual) => {
    try {
      // Verificar si ya existe una alerta activa para este producto
      const alertaExistente = alertas.find(
        a => a.producto_id === producto.producto_id && 
             a.estado === 'Activa' && 
             a.tipo === 'Stock Bajo'
      );
      
      if (alertaExistente) {
        console.log('Ya existe una alerta para este producto');
        return alertaExistente;
      }
      
      // Crear nueva alerta
      const nuevaAlerta = {
        tipo: 'Stock Bajo',
        mensaje: `Stock bajo para ${producto.nombre}. Quedan ${stockActual} unidades.`,
        fecha_creacion: new Date().toISOString(),
        estado: 'Activa',
        producto_id: producto.producto_id
      };
      
      return await crearAlerta(nuevaAlerta);
    } catch (err) {
      console.error('Error al crear alerta de stock bajo:', err);
      throw err;
    }
  };

  // Función para crear alerta de stock agotado
  const crearAlertaStockAgotado = async (producto, stockActual) => {
    try {
      // Verificar si ya existe una alerta activa para este producto
      const alertaExistente = alertas.find(
        a => a.producto_id === producto.producto_id && 
             a.estado === 'Activa' && 
             a.tipo === 'Stock Agotado'
      );
      
      if (alertaExistente) {
        console.log('Ya existe una alerta para este producto');
        return alertaExistente;
      }
      
      // Crear nueva alerta
      const nuevaAlerta = {
        tipo: 'Stock Agotado',
        mensaje: `¡URGENTE! Stock agotado para ${producto.nombre}. Se requiere reposición inmediata.`,
        fecha_creacion: new Date().toISOString(),
        estado: 'Activa',
        producto_id: producto.producto_id
      };
      
      return await crearAlerta(nuevaAlerta);
    } catch (err) {
      console.error('Error al crear alerta de stock agotado:', err);
      throw err;
    }
  };

  // Función para marcar notificación como leída
  const marcarNotificacionLeida = (id) => {
    // Actualizar el estado local
    setNotificaciones(prevNotificaciones => 
      prevNotificaciones.map(notif => 
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
    
    // Actualizar la lista de notificaciones leídas
    const nuevasLeidas = [...notificacionesLeidas];
    if (!nuevasLeidas.includes(id)) {
      nuevasLeidas.push(id);
      setNotificacionesLeidas(nuevasLeidas);
      // Persistir en localStorage
      saveNotificacionesLeidas(nuevasLeidas);
    }
  };

  // Función para eliminar notificación
  const eliminarNotificacion = (id) => {
    // Eliminar de la lista de notificaciones
    setNotificaciones(prevNotificaciones => 
      prevNotificaciones.filter(notif => notif.id !== id)
    );
    
    // Eliminar de la lista de notificaciones leídas si está presente
    const nuevasLeidas = notificacionesLeidas.filter(notifId => notifId !== id);
    if (nuevasLeidas.length !== notificacionesLeidas.length) {
      setNotificacionesLeidas(nuevasLeidas);
      // Actualizar localStorage
      saveNotificacionesLeidas(nuevasLeidas);
    }
  };

  // Valor del contexto
  const value = {
    alertas,
    notificaciones,
    loading,
    error,
    fetchAlertas,
    crearAlerta,
    crearAlertaStockBajo,
    crearAlertaStockAgotado,
    marcarNotificacionLeida,
    eliminarNotificacion
  };

  return (
    <AlertasContext.Provider value={value}>
      {children}
    </AlertasContext.Provider>
  );
};
