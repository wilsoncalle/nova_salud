import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVentas, getVentasByDateRange, deleteVenta } from '../../services/ventasService';
import VentaCard from './VentaCard';
import VentaModal from './VentaModal';
import VentaForm from './VentaForm';
import VentaDetails from './VentaDetails';
import './VentaStyles.css';

export default function VentaList() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [ventaEditId, setVentaEditId] = useState(null);
  const [ventaDetailsId, setVentaDetailsId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    loadVentas();
  }, []);

  const loadVentas = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (startDate && endDate) {
        data = await getVentasByDateRange(startDate, endDate);
      } else {
        data = await getVentas();
      }
      setVentas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      setError('Error al cargar las ventas. Por favor, intente nuevamente.');
      setVentas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    loadVentas();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta venta?')) {
      try {
        await deleteVenta(id);
        loadVentas();
      } catch (error) {
        console.error('Error al eliminar venta:', error);
      }
    }
  };

  const handleEdit = (id) => {
    setVentaEditId(id);
  };

  // Filtro de búsqueda
  const ventasFiltradas = ventas.filter(venta =>
    venta.num_comprobante?.toLowerCase().includes(search.toLowerCase()) ||
    (venta.cliente_nombres && venta.cliente_nombres.toLowerCase().includes(search.toLowerCase())) ||
    (venta.empleado_nombres && venta.empleado_nombres.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(ventasFiltradas.length / pageSize));

  React.useEffect(() => { setPage(1); }, [search, startDate, endDate]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = ventasFiltradas.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="venta-list">
      <div className="venta-list-header">
        
        <div className="venta-list-filters">
          <div className="venta-list-search">
            <input
              type="text"
              placeholder="Buscar ventas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <form onSubmit={handleDateFilter} className="venta-list-date-filter">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Fecha inicio"
            />
            <button type="submit">Filtrar</button>
            {(startDate || endDate) && (
              <button type="button" onClick={() => {
                setStartDate('');
                setEndDate('');
                loadVentas();
              }}>
                Limpiar
              </button>
            )}
          </form>
        </div>
      </div>

      {loading ? (
        <div className="venta-list-loading">
          <p>Cargando ventas...</p>
        </div>
      ) : error ? (
        <div className="venta-list-error">
          <p>{error}</p>
          <button onClick={loadVentas}>Reintentar</button>
        </div>
      ) : ventas.length === 0 ? (
        <div className="venta-list-empty">
          <p>No hay ventas registradas.</p>
        </div>
      ) : (
        <>
          <div className="venta-list-grid">
            {paginated.map((venta) => (
              <VentaCard
                key={venta.venta_id}
                venta={venta}
                onDelete={() => handleDelete(venta.venta_id)}
                onDetails={setVentaDetailsId}
              />
            ))}
          </div>

          <div className="pagination">
            <button 
              onClick={handlePrev} 
              disabled={page === 1} 
              className="pagination-button"
            >
              &laquo; Anterior
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`pagination-number ${page === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleNext} 
              disabled={page === totalPages}
              className="pagination-button"
            >
              Siguiente &raquo;
            </button>
          </div>
        </>
      )}
      {/* Modal de edición de venta */}
      <VentaModal isOpen={!!ventaEditId} onClose={() => setVentaEditId(null)}>
        {ventaEditId && (
          <VentaForm id={ventaEditId} onSuccess={() => { setVentaEditId(null); loadVentas(); }} />
        )}
      </VentaModal>
      {/* Modal de detalles de venta */}
      <VentaModal isOpen={!!ventaDetailsId} onClose={() => setVentaDetailsId(null)}>
        {ventaDetailsId && (
          <VentaDetails id={ventaDetailsId} onCancel={() => setVentaDetailsId(null)} />
        )}
      </VentaModal>
    </div>
  );
}