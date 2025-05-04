import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/productosService';
import './ComprasStyles.css';

export default function ProductosBajoStock({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    const res = await getProductos();
    setProductos(Array.isArray(res.data) ? res.data.filter(p => p.stock_actual < 50) : []);
  };

  const handleAgregar = () => {
    const producto = productos.find(p => p.producto_id === parseInt(selectedId));
    if (producto && cantidad > 0 && precio > 0) {
      onAgregar({
        producto_id: producto.producto_id,
        producto_nombre: producto.nombre,
        cantidad: parseInt(cantidad),
        precio_unitario: parseFloat(precio)
      });
      setSelectedId('');
      setCantidad('');
      setPrecio('');
    }
  };

  return (
    <div className="productos-bajo-stock">
      <label>Agregar producto con bajo stock (&lt;50)</label>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">Seleccione producto</option>
        {productos.map(p => (
          <option key={p.producto_id} value={p.producto_id}>
            {p.nombre} (Stock: {p.stock_actual})
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={e => setCantidad(e.target.value)}
        placeholder="Cantidad"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        placeholder="Precio unitario"
      />
      <button type="button" onClick={handleAgregar}>Agregar</button>
    </div>
  );
}
