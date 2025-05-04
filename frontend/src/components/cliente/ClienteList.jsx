import React, { useState, useEffect } from 'react';
import ClienteCard from './ClienteCard';
import './ClienteStyles.css';

export default function ClienteList({ clientes, onEdit, onDelete, onDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredClientes = clientes.filter(cliente => 
    `${cliente.nombres} ${cliente.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.num_documento.includes(searchTerm)
  );

  const totalPages = Math.max(1, Math.ceil(filteredClientes.length / pageSize));

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [searchTerm]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = filteredClientes.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="cliente-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="clientes-grid">
        {paginated.length === 0 ? (
          <div className="cliente-list-empty">
            <p>No se encontraron clientes.</p>
          </div>
        ) : (
          paginated.map(cliente => (
            <ClienteCard
              key={cliente.cliente_id}
              cliente={cliente}
              onEdit={() => onEdit(cliente)}
              onDelete={() => onDelete(cliente.cliente_id)}
              onDetails={() => onDetails(cliente)}
            />
          ))
        )}
      </div>
      
      {filteredClientes.length > pageSize && (
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
    </div>
  );
}
