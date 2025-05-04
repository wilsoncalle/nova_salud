import React, { useEffect, useState } from 'react';
import { getProductos } from '../../services/productosService';
import ProductoCard from './ProductoCard';
import './ProductosStyles.css';

export default function ProductoList({ productos = [], onEdit, onDelete, onDetails }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 10;

  // Filtro de búsqueda
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (prod.descripcion && prod.descripcion.toLowerCase().includes(search.toLowerCase())) ||
    (prod.categoria_nombre && prod.categoria_nombre.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(productosFiltrados.length / pageSize));

  // Resetear página si cambia el filtro
  React.useEffect(() => { setPage(1); }, [search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = productosFiltrados.slice((page - 1) * pageSize, page * pageSize);
  
  if (!productos.length) {
    return (
      <div className="producto-list-empty">
        <p>No hay productos registrados.</p>
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
          placeholder="Buscar producto..."
          style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #b3b3b3', minWidth: 220, fontSize: 15 }}
        />
      </div>
      <div className="producto-list">
        {paginated.length === 0 ? (
          <div className="producto-list-empty">No se encontraron productos.</div>
        ) : (
          paginated.map(producto => (
            <ProductoCard
              key={producto.producto_id}
              producto={producto}
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