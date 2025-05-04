import React, { useState, useEffect } from 'react';
import { createCompra, getCompra, updateCompra } from '../../services/comprasService';
import ProveedorSelector from './ProveedorSelector';
import ProductosBajoStock from './ProductosBajoStock';
import AgregarProductoNuevo from './AgregarProductoNuevo';
import CompraModal from './CompraModal';
import './ComprasStyles.css';

export default function CompraForm({ id, onSuccess, onCancel, inModal = false }) {
  const [formData, setFormData] = useState({
    proveedor_id: '',
    fecha_compra: new Date().toISOString().split('T')[0],
    numero_factura: '',
    subtotal: 0,
    igv: 0,
    total: 0,
    detalles: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadCompra();
  }, [id]);

  const loadCompra = async () => {
    setLoading(true);
    try {
      const res = await getCompra(id);
      setFormData({
        ...res.data,
        proveedor_id: res.data.proveedor_id?.toString(),
        subtotal: Number(res.data.subtotal) || 0,
        igv: Number(res.data.igv) || 0,
        total: Number(res.data.total) || 0,
        detalles: Array.isArray(res.data.detalles) ? res.data.detalles : []
      });
    } catch (e) {
      setError('Error al cargar compra.');
    } finally {
      setLoading(false);
    }
  };

  const handleProveedorSelect = (proveedor) => {
    setFormData(prev => ({ ...prev, proveedor_id: proveedor.proveedor_id }));
  };

  const handleAgregarDetalle = (detalle) => {
    setFormData(prev => ({ ...prev, detalles: [...prev.detalles, detalle] }));
  };

  const handleAgregarProductoNuevo = (producto) => {
    // Aquí deberías guardar el nuevo producto en la base de datos y luego añadirlo a detalles
    // Este es un placeholder
    handleAgregarDetalle({ ...producto, producto_id: 'nuevo', producto_nombre: producto.nombre });
  };

  const calcularTotales = () => {
    const subtotal = formData.detalles.reduce((acc, d) => acc + (d.cantidad * d.precio_unitario), 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;
    setFormData(prev => ({ ...prev, subtotal, igv, total }));
  };

  useEffect(() => { calcularTotales(); }, [formData.detalles]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateCompra(id, formData);
      } else {
        await createCompra(formData);
      }
      if (onSuccess) onSuccess();
    } catch (e) {
      setError('Error al guardar compra.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form className="compra-form" onSubmit={handleSubmit}>
        <h2>{id ? 'Editar Compra' : 'Nueva Compra'}</h2>
        {error && <p className="error">{error}</p>}
        <ProveedorSelector className="proveedor-selector" onSelect={handleProveedorSelect} selectedId={formData.proveedor_id} />
        <div className="form-row">
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="fecha_compra"
              value={formData.fecha_compra}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Número de Factura</label>
            <input
              type="text"
              name="numero_factura"
              value={formData.numero_factura}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <ProductosBajoStock onAgregar={handleAgregarDetalle} />
        <AgregarProductoNuevo onAgregar={handleAgregarProductoNuevo} />
        <div className="detalles-section">
          <h3>Detalles de la Compra</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(formData.detalles || []).map((d, i) => (
                <tr key={i}>
                  <td>{d.producto_nombre}</td>
                  <td>{d.cantidad}</td>
                  <td>S/ {parseFloat(d.precio_unitario).toFixed(2)}</td>
                  <td>S/ {(d.cantidad * d.precio_unitario).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="totales">
          <div>Subtotal: S/ {formData.subtotal.toFixed(2)}</div>
          <div>IGV (18%): S/ {formData.igv.toFixed(2)}</div>
          <div>Total: S/ {formData.total.toFixed(2)}</div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="submit" disabled={loading}>{id ? 'Actualizar' : 'Registrar'} Compra</button>
        </div>
      </form>
  );

  if (inModal) {
    return formContent;
  }
  return (
    <CompraModal isOpen={true} onClose={onCancel}>
      {formContent}
    </CompraModal>
  );
}
