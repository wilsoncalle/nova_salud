import React, { useEffect, useState } from 'react';
import ProveedorCard from './ProveedorCard';
import './ProveedoresStyles.css';

import { getProveedor } from '../../services/proveedoresService';
import ProveedorModal from './ProveedorModal';
import ProveedorDetails from './ProveedorDetails';

import ProveedorForm from './ProveedorForm';

export default function ProveedorList({ proveedores = [], onEdit, onDelete }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [localProveedores, setLocalProveedores] = useState(proveedores);
  const pageSize = 10;

  // Update local proveedores when prop changes
  React.useEffect(() => {
    setLocalProveedores(proveedores);
  }, [proveedores]);

  // Search filter
  const proveedoresFiltrados = localProveedores.filter(prov =>
    (prov.nombre || "").toLowerCase().includes(search.toLowerCase()) ||
    (prov.ruc || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(proveedoresFiltrados.length / pageSize));

  // Reset page if filter changes
  React.useEffect(() => { setPage(1); }, [search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const paginated = proveedoresFiltrados.slice((page - 1) * pageSize, page * pageSize);

  // Detalles modal
  const [proveedorDetalles, setProveedorDetalles] = useState(null);
  const [modalDetallesOpen, setModalDetallesOpen] = useState(false);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [errorDetalles, setErrorDetalles] = useState(null);

  // Editar modal
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [errorEditar, setErrorEditar] = useState(null);

  const handleDetails = async (id) => {
    setLoadingDetalles(true);
    setErrorDetalles(null);
    try {
      const { data } = await getProveedor(id);
      setProveedorDetalles(data);
      setModalDetallesOpen(true);
    } catch (err) {
      setErrorDetalles('No se pudo cargar el proveedor.');
      setModalDetallesOpen(true);
    } finally {
      setLoadingDetalles(false);
    }
  };

  const handleEdit = async (id) => {
    setLoadingEditar(true);
    setErrorEditar(null);
    try {
      const { data } = await getProveedor(id);
      setProveedorEditar(data);
      setModalEditarOpen(true);
    } catch (err) {
      setErrorEditar('No se pudo cargar el proveedor.');
      setModalEditarOpen(true);
    } finally {
      setLoadingEditar(false);
    }
  };

  if (!localProveedores.length) {
    return (
      <div className="proveedor-list-empty">
        <p>No hay proveedores registrados.</p>
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
          placeholder="Buscar proveedor..."
          style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #b3b3b3', minWidth: 220, fontSize: 15 }}
        />
      </div>
      <div className="proveedor-list">
        {paginated.length === 0 ? (
          <div className="proveedor-list-empty">
            <p>No se encontraron proveedores.</p>
          </div>
        ) : (
          paginated.map((proveedor) => (
            <ProveedorCard 
              key={proveedor.proveedor_id} 
              proveedor={proveedor} 
              onEdit={() => handleEdit(proveedor.proveedor_id)}
              onDelete={() => onDelete(proveedor.proveedor_id)}
              onDetails={() => handleDetails(proveedor.proveedor_id)}
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
      {/* Modal de detalles */}
      {modalDetallesOpen && (
        <ProveedorModal isOpen={modalDetallesOpen} onClose={() => setModalDetallesOpen(false)}>
          {loadingDetalles ? (
            <div style={{padding:24}}>Cargando...</div>
          ) : errorDetalles ? (
            <div style={{padding:24, color:'red'}}>{errorDetalles}</div>
          ) : (
            <ProveedorDetails proveedor={proveedorDetalles} onCancel={() => setModalDetallesOpen(false)} />
          )}
        </ProveedorModal>
      )}
      {/* Modal de edición */}
      {modalEditarOpen && (
        <ProveedorModal isOpen={modalEditarOpen} onClose={() => setModalEditarOpen(false)}>
          {loadingEditar ? (
            <div style={{padding:24}}>Cargando...</div>
          ) : errorEditar ? (
            <div style={{padding:24, color:'red'}}>{errorEditar}</div>
          ) : (
            <ProveedorForm proveedor={proveedorEditar} onSubmit={() => setModalEditarOpen(false)} onCancel={() => setModalEditarOpen(false)} />
          )}
        </ProveedorModal>
      )}
    </>
  );
}
