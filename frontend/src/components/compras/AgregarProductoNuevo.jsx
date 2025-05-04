import React, { useState } from 'react';
import './ComprasStyles.css';

export default function AgregarProductoNuevo({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAgregar = () => {
    if (nombre && cantidad > 0 && precio > 0) {
      // Aquí deberías guardar el producto en la base de datos antes de agregarlo a la compra
      onAgregar({ nombre, cantidad: parseInt(cantidad), precio_unitario: parseFloat(precio) });
      setNombre('');
      setCantidad('');
      setPrecio('');
    }
  };

  return (
    <div className="agregar-producto-nuevo">
      <label>Agregar producto nuevo</label>
      <input
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre del producto"
      />
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
