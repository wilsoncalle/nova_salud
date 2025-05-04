import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getAlertas, updateAlerta, deleteAlerta } from '../../services/alertasService';
import { getProductos } from '../../services/productosService';
import AlertaCard from './AlertaCard';
import './AlertasStyles.css';

export default function AlertaList() {
  const [alertas, setAlertas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activas'); // 'activas' o 'resueltas'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Número de alertas por página
  const [highlightedAlertaId, setHighlightedAlertaId] = useState(null);
  
  // Referencia para hacer scroll a la alerta resaltada
  const alertaRefs = useRef({});
  
  // Obtener los parámetros de la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetchAlertas();
    fetchProductos();
    
    // Verificar si hay un ID de alerta para resaltar en la URL
    const highlightId = queryParams.get('highlight');
    if (highlightId) {
      const alertaId = parseInt(highlightId);
      setHighlightedAlertaId(alertaId);
      
      // Cambiar a la pestaña correcta si es necesario
      // (asumiendo que la alerta resaltada podría estar en cualquier pestaña)
      setActiveTab('activas'); // Por defecto, buscar primero en activas
      
      // Quitar el resaltado después de 5 segundos
      const timer = setTimeout(() => {
        setHighlightedAlertaId(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  const fetchAlertas = async () => {
    setLoading(true);
    const { data } = await getAlertas();
    setAlertas(data);
    setLoading(false);
    
    // Si hay una alerta para resaltar, encontrarla y calcular la página correcta
    if (highlightedAlertaId) {
      const alertaIndex = data.findIndex(alerta => alerta.alerta_id === highlightedAlertaId);
      if (alertaIndex !== -1) {
        // Determinar en qué pestaña está la alerta
        const alerta = data[alertaIndex];
        const tab = alerta.estado === 'Activa' ? 'activas' : 'resueltas';
        setActiveTab(tab);
        
        // Calcular la página correcta
        const page = Math.floor(alertaIndex / itemsPerPage) + 1;
        setCurrentPage(page);
      }
    }
  };

  const fetchProductos = async () => {
    const { data } = await getProductos();
    setProductos(data);
  };

  const handleResolve = async (id) => {
    const alerta = alertas.find(a => a.alerta_id === id);
    await updateAlerta(id, { ...alerta, estado: 'Resuelta' });
    fetchAlertas();
  };

  const handleDelete = async (id) => {
    await deleteAlerta(id);
    fetchAlertas();
  };

  const getProducto = (producto_id) => productos.find(p => p.producto_id === producto_id);

  // Filtrar alertas según la pestaña activa
  const filteredAlertas = alertas.filter(alerta => 
    activeTab === 'activas' ? alerta.estado === 'Activa' : alerta.estado === 'Resuelta'
  );

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredAlertas.length / itemsPerPage);

  // Obtener las alertas para la página actual
  const currentAlertas = filteredAlertas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Resetear a la primera página al cambiar de pestaña
  };

  return (
    <div className="alerta-list-container">
      <div className="alerta-tabs">
        <button 
          className={`alerta-tab ${activeTab === 'activas' ? 'active' : ''}`}
          onClick={() => handleTabChange('activas')}
        >
          Alertas Activas
        </button>
        <button 
          className={`alerta-tab ${activeTab === 'resueltas' ? 'active' : ''}`}
          onClick={() => handleTabChange('resueltas')}
        >
          Alertas Resueltas
        </button>
      </div>

      {loading ? (
        <div className="alerta-list-loading">Cargando alertas...</div>
      ) : currentAlertas.length === 0 ? (
        <div className="alerta-list-empty">
          {activeTab === 'activas' ? 'No hay alertas activas.' : 'No hay alertas resueltas.'}
        </div>
      ) : (
        <>
          <div className="alerta-list">
            {currentAlertas.map(alerta => (
              <AlertaCard
                setRef={node => {
                  // Guardar la referencia al nodo para poder hacer scroll
                  if (node && alerta.alerta_id === highlightedAlertaId) {
                    alertaRefs.current[alerta.alerta_id] = node;
                    // Hacer scroll a la alerta resaltada
                    setTimeout(() => {
                      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                  }
                }}
                isHighlighted={alerta.alerta_id === highlightedAlertaId}
                key={alerta.alerta_id}
                alerta={alerta}
                producto={getProducto(alerta.producto_id)}
                onResolve={handleResolve}
                onDelete={handleDelete}
              />
            ))}
          </div>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={goToPreviousPage} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                &laquo; Anterior
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Siguiente &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
