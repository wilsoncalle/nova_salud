import React, { useEffect, useState } from 'react';
import { getEmpleados } from '../../services/empleadosService';
import EmpleadoCard from './EmpleadoCard';
import './EmpleadosStyles.css';

export default function EmpleadoList({ empleados = [], onEdit, onDelete, onDetails }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [localEmpleados, setLocalEmpleados] = useState(empleados);
  const pageSize = 10;

  console.log('Empleados in EmpleadoList:', empleados);

  // Update local employees when prop changes
  React.useEffect(() => {
    setLocalEmpleados(empleados);
  }, [empleados]);

  // Search filter
  const empleadosFiltrados = localEmpleados.filter(emp =>
    (emp.nombres || "").toLowerCase().includes(search.toLowerCase()) ||
    (emp.apellidos || "").toLowerCase().includes(search.toLowerCase()) ||
    (emp.dni || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(empleadosFiltrados.length / pageSize));

  // Reset page if filter changes
  React.useEffect(() => { setPage(1); }, [search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = empleadosFiltrados.slice((page - 1) * pageSize, page * pageSize);
  
  if (!localEmpleados.length) {
    return (
      <div className="empleado-list-empty">
        <p>No hay empleados registrados.</p>
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
          placeholder="Buscar empleado..."
          style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #b3b3b3', minWidth: 220, fontSize: 15 }}
        />
      </div>
      <div className="empleado-list">
        {paginated.length === 0 ? (
          <div className="empleado-list-empty">
            <p>No se encontraron empleados.</p>
          </div>
        ) : (
          paginated.map((empleado) => (
            <EmpleadoCard 
              key={empleado.empleado_id} 
              empleado={empleado} 
              onEdit={() => onEdit(empleado)}
              onDelete={() => onDelete(empleado.empleado_id)}
              onDetails={() => onDetails(empleado)}
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
