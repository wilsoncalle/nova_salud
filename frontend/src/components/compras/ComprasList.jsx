import React, { useState, useEffect } from 'react';
import { getCompras, deleteCompra } from '../../services/comprasService';
import CompraForm from './CompraForm';
import CompraModal from './CompraModal';
import CompraCard from './CompraCard';
import './ComprasStyles.css';

export default function ComprasList({ compras = [], onEdit, onDelete, onDetails }) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const comprasFiltradas = compras.filter(c =>
    c.numero_factura?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(comprasFiltradas.length / pageSize));

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = comprasFiltradas.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="compras-list">
      <div className="compras-list-header">
        <input
          type="text"
          placeholder="Buscar por factura..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Cargando compras...</p>
      ) : error ? (
        <p>{error}</p>
      ) : comprasFiltradas.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <>
          <div className="compras-card-grid">
            {paginated.map(compra => (
              <CompraCard
                key={compra.compra_id}
                compra={compra}
                onEdit={() => onEdit && onEdit(compra)}
                onDelete={() => onDelete && onDelete(compra.compra_id)}
                onDetails={() => onDetails && onDetails(compra)}
              />
            ))}
          </div>
          
          {comprasFiltradas.length > pageSize && (
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
          )}
        </>
      )}
      {/* Los modales ahora están gestionados en App.jsx */}
    </div>
  );
}
