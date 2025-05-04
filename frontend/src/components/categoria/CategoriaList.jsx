import React, { useEffect, useState } from 'react';
import { getCategorias } from '../../services/categoriasService';
import CategoriaCard from './CategoriaCard';
import './CategoriaStyles.css';

export default function CategoriaList({ categorias = [], onEdit, onDelete, onDetails }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [localCategorias, setLocalCategorias] = useState(categorias);
  const pageSize = 10;

  // Update local categories when prop changes
  React.useEffect(() => {
    setLocalCategorias(categorias);
  }, [categorias]);

  // Filtro de búsqueda
  const categoriasFiltradas = localCategorias.filter(cat =>
    cat.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (cat.descripcion && cat.descripcion.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(categoriasFiltradas.length / pageSize));

  // Resetear página si cambia el filtro
  React.useEffect(() => { setPage(1); }, [search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = categoriasFiltradas.slice((page - 1) * pageSize, page * pageSize);
  
  if (!localCategorias.length) {
    return (
      <div className="categoria-list-empty">
        <p>No hay categorías registradas.</p>
      </div>
    );
  }
  return (
    <>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom: 18 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar categoría..."
          style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #b3b3b3', minWidth: 220, fontSize: 15 }}
        />
      </div>
      <div className="categoria-list">
        {paginated.length === 0 ? (
          <div className="categoria-list-empty">No se encontraron categorías.</div>
        ) : (
          paginated.map(categoria => (
            <CategoriaCard
              key={categoria.categoria_id}
              categoria={categoria}
              onEdit={onEdit}
              onDelete={onDelete}
              onDetails={onDetails}
            />
          ))
        )}
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
  );
}

