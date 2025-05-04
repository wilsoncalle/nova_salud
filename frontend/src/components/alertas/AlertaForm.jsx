import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/productosService';
import './AlertaForm.css';

const tipoAlertas = [
  'Stock Bajo',
  'Próximo a Vencer',
  'Sin Stock'
];

const estadoAlertas = [
  'Activa',
  'Resuelta'
];

export default function AlertaForm({ initialData = {}, onSubmit, onCancel }) {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    producto_id: '',
    tipo_alerta: '',
    mensaje: '',
    estado: 'Activa',
    ...initialData
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos().then(({ data }) => {
      setProductos(data);
      setLoading(false);
    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="alerta-form" onSubmit={handleSubmit}>
      <h3>{form.alerta_id ? 'Editar Alerta' : 'Nueva Alerta'}</h3>
      <label>Producto:</label>
      <select name="producto_id" value={form.producto_id} onChange={handleChange} required>
        <option value="">Seleccione un producto</option>
        {loading ? <option>Cargando...</option> : productos.map(p => (
          <option key={p.producto_id} value={p.producto_id}>{p.nombre}</option>
        ))}
      </select>
      <label>Tipo de Alerta:</label>
      <select name="tipo_alerta" value={form.tipo_alerta} onChange={handleChange} required>
        <option value="">Seleccione tipo</option>
        {tipoAlertas.map(tipo => (
          <option key={tipo} value={tipo}>{tipo}</option>
        ))}
      </select>
      <label>Mensaje:</label>
      <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
      <label>Estado:</label>
      <select name="estado" value={form.estado} onChange={handleChange} required>
        {estadoAlertas.map(estado => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>
      <div className="alerta-form-actions">
        <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-guardar">{form.alerta_id ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
