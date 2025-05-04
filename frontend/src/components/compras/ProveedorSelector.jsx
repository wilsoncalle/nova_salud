import React, { useState, useEffect } from 'react';
import { getProveedores } from '../../services/proveedoresService';
import './ComprasStyles.css';

export default function ProveedorSelector({ onSelect, selectedId }) {
  const [proveedores, setProveedores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProveedores();
  }, []);

  const loadProveedores = async () => {
    const res = await getProveedores();
    setProveedores(Array.isArray(res.data) ? res.data : []);
  };

  const proveedoresFiltrados = proveedores.filter(p =>
    p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    p.ruc?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="proveedor-selector">
      <label>Proveedor</label>
      <input
        type="text"
        placeholder="Buscar proveedor por nombre o RUC..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        value={selectedId}
        onChange={e => {
          const prov = proveedores.find(p => p.proveedor_id === parseInt(e.target.value));
          if (prov) onSelect(prov);
        }}
      >
        <option value="">Seleccione un proveedor</option>
        {proveedoresFiltrados.map(p => (
          <option key={p.proveedor_id} value={p.proveedor_id}>
            {p.nombre} ({p.ruc})
          </option>
        ))}
      </select>
    </div>
  );
}
