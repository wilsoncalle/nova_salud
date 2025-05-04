import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenta } from '../../services/ventasService';
import './VentaStyles.css';

export default function VentaDetails({ id: propId, onCancel }) {
  const params = useParams();
  const navigate = useNavigate();
  const id = propId || params.id;
  const [venta, setVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenta() {
      try {
        setLoading(true);
        setError(null);
        const data = await getVenta(id);
        setVenta(data);
      } catch (err) {
        setError('No se pudo cargar la venta.');
      } finally {
        setLoading(false);
      }
    }
    fetchVenta();
  }, [id]);

  if (loading) return <div className="venta-details-loading">Cargando...</div>;
  if (error) return <div className="venta-details-error">{error}</div>;
  if (!venta) return null;

  return (
    <div className="venta-details-container">
      {!propId && (
        <button className="btn-back" onClick={() => navigate(-1)}>Volver</button>
      )}
      <h2>Detalles de la Venta #{venta.venta_id}</h2>
      <div className="venta-details-info">
        <p><strong>Cliente:</strong> {venta.cliente_nombres}</p>
        <p><strong>Empleado:</strong> {venta.empleado_nombres}</p>
        <p><strong>Fecha:</strong> {new Date(venta.fecha_venta || venta.fecha).toLocaleString('es-PE')}</p>
        <p><strong>Comprobante:</strong> {venta.tipo_comprobante} - {venta.num_comprobante}</p>
        <p><strong>Método de pago:</strong> {venta.metodo_pago}</p>
        <p><strong>Estado:</strong> {venta.estado}</p>
      </div>
      <h3>Productos vendidos</h3>
      <table className="venta-details-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {venta.detalles && venta.detalles.map((d, idx) => (
            <tr key={idx}>
              <td>{d.producto_nombre || d.nombre}</td>
              <td>{d.cantidad}</td>
              <td>S/ {parseFloat(d.precio_unitario).toFixed(2)}</td>
              <td>S/ {parseFloat(d.subtotal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="venta-details-totals">
        <p><strong>Subtotal:</strong> S/ {parseFloat(venta.subtotal).toFixed(2)}</p>
        <p><strong>IGV:</strong> S/ {parseFloat(venta.igv).toFixed(2)}</p>
        <p><strong>Total:</strong> S/ {parseFloat(venta.total).toFixed(2)}</p>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancelar" onClick={onCancel || (() => navigate('/ventas'))}>Cerrar</button>
      </div>
    </div>
  );
}
