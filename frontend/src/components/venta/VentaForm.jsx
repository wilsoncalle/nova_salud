import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVenta, getVenta, updateVenta } from '../../services/ventasService';
import { getProductos } from '../../services/productosService';
import { getClientes } from '../../services/clientesService';
import { getEmpleados } from '../../services/empleadosService';
import { useAlertas } from '../../context/AlertasContext';
import './VentaStyles.css';

export default function VentaForm({ id: propId, onSuccess, onCancel }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const id = propId ?? routeId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const { crearAlertaStockBajo, crearAlertaStockAgotado } = useAlertas();
  const [formData, setFormData] = useState({
    cliente_id: '',
    empleado_id: '',
    tipo_comprobante: 'Boleta',
    num_comprobante: '',
    fecha_venta: new Date().toISOString().split('T')[0],
    subtotal: 0,
    igv: 0,
    total: 0,
    metodo_pago: 'Efectivo',
    detalles: []
  });

  const [detalleTemp, setDetalleTemp] = useState({
    producto_id: '',
    cantidad: '1',
    precio_unitario: 0
  });
  const [productoSearch, setProductoSearch] = useState('');
  const [stockError, setStockError] = useState('');

  useEffect(() => {
    loadInitialData();
  }, [id]);

  // Generar número de comprobante automático si está vacío
  useEffect(() => {
    if (!formData.num_comprobante) {
      const randomNum = 'NC-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);
      setFormData(prev => ({ ...prev, num_comprobante: randomNum }));
    }
  }, [formData.num_comprobante]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Cargando datos iniciales...');
      
      const [productosRes, clientesRes, empleadosRes] = await Promise.all([
        getProductos(),
        getClientes(),
        getEmpleados()
      ]);

      const productosData = productosRes.data;
      const clientesData = clientesRes.data;
      const empleadosData = empleadosRes.data;

      console.log('Datos recibidos:', { productosData, clientesData, empleadosData });

      if (!Array.isArray(productosData)) {
        throw new Error('La respuesta de productos no es un array');
      }
      if (!Array.isArray(clientesData)) {
        throw new Error('La respuesta de clientes no es un array');
      }
      if (!Array.isArray(empleadosData)) {
        throw new Error('La respuesta de empleados no es un array');
      }

      setProductos(productosData);
      setClientes(clientesData);
      setEmpleados(empleadosData);

      if (id) {
        const ventaData = await getVenta(id);
        console.log('Datos de venta cargados:', ventaData);
        
        // Asegurarse de que la fecha esté en el formato correcto para el input date
        const fecha = ventaData.fecha_venta ? new Date(ventaData.fecha_venta).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        
        // Formatear los detalles con los nombres de productos
        const detallesFormateados = ventaData.detalles.map(detalle => {
          const producto = productosData.find(p => p.producto_id === detalle.producto_id);
          return {
            ...detalle,
            producto_nombre: producto ? producto.nombre : 'Producto no encontrado'
          };
        });

        setFormData({
          ...ventaData,
          fecha_venta: fecha,
          detalles: detallesFormateados,
          cliente_id: ventaData.cliente_id?.toString() || '',
          empleado_id: ventaData.empleado_id?.toString() || empleadosData[0]?.empleado_id?.toString() || ''
        });
      } else if (empleadosData.length > 0) {
        setFormData(prev => ({
          ...prev,
          empleado_id: empleadosData[0].empleado_id.toString()
        }));
      }
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
      setError(error.message || 'Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductoChange = (e) => {
    const producto = productos.find(p => p.producto_id === parseInt(e.target.value));
    setDetalleTemp(prev => ({
      ...prev,
      producto_id: e.target.value,
      precio_unitario: producto ? parseFloat(producto.precio_venta) : 0
    }));
  };

  const handleCantidadChange = (e) => {
    let cantidad = e.target.value;
    // Solo permitir números enteros positivos
    if (!/^[0-9]+$/.test(cantidad)) {
      cantidad = '';
    }
    const producto = productos.find(p => p.producto_id === parseInt(detalleTemp.producto_id));
    let cantidadNum = parseInt(cantidad) || 0;
    if (producto && cantidadNum > producto.stock_actual) {
      setStockError('Stock insuficiente');
      cantidad = producto.stock_actual.toString();
    } else {
      setStockError('');
    }
    setDetalleTemp(prev => ({
      ...prev,
      cantidad
    }));
  };

  const agregarDetalle = () => {
    const producto = productos.find(p => p.producto_id === parseInt(detalleTemp.producto_id));
    if (!producto) return;

    let cantidad = parseInt(detalleTemp.cantidad);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    if (cantidad > producto.stock_actual) {
      setStockError('Stock insuficiente');
      return;
    }
    setStockError('');
    const precio_unitario = parseFloat(detalleTemp.precio_unitario);
    const subtotal = cantidad * precio_unitario;
    console.log('Agregando detalle:', detalleTemp, 'Cantidad usada:', cantidad);

    setFormData(prev => {
      const idx = prev.detalles.findIndex(d => parseInt(d.producto_id) === parseInt(detalleTemp.producto_id));
      let nuevosDetalles;
      if (idx !== -1) {
        // Si existe, suma la cantidad
        nuevosDetalles = prev.detalles.map((d, i) =>
          i === idx
            ? {
                ...d,
                cantidad: parseInt(d.cantidad) + cantidad,
                subtotal: (parseInt(d.cantidad) + cantidad) * precio_unitario,
              }
            : d
        );
      } else {
        // Si no existe, lo agrega
        nuevosDetalles = [
          ...prev.detalles,
          {
            producto_id: parseInt(detalleTemp.producto_id),
            cantidad,
            precio_unitario,
            subtotal,
            producto_nombre: producto.nombre,
          },
        ];
      }
      const nuevoSubtotal = nuevosDetalles.reduce((sum, d) => sum + parseFloat(d.subtotal), 0);
      const nuevoIgv = nuevoSubtotal * 0.18;
      return {
        ...prev,
        detalles: nuevosDetalles,
        subtotal: nuevoSubtotal,
        igv: nuevoIgv,
        total: nuevoSubtotal + nuevoIgv,
      };
    });

    setDetalleTemp({
      producto_id: '',
      cantidad: '1',
      precio_unitario: 0,
    });
  };


  const eliminarDetalle = (index) => {
    setFormData(prev => {
      const nuevosDetalles = prev.detalles.filter((_, i) => i !== index);
      const nuevoSubtotal = nuevosDetalles.reduce((sum, d) => sum + parseFloat(d.subtotal), 0);
      const nuevoIgv = nuevoSubtotal * 0.18;
      return {
        ...prev,
        detalles: nuevosDetalles,
        subtotal: nuevoSubtotal,
        igv: nuevoIgv,
        total: nuevoSubtotal + nuevoIgv
      };
    });
  };

  const validateForm = () => {
    if (!formData.empleado_id) {
      setError('Debe seleccionar un empleado');
      return false;
    }
    if (!formData.tipo_comprobante) {
      setError('Debe seleccionar un tipo de comprobante');
      return false;
    }
    if (!formData.num_comprobante) {
      setError('Debe ingresar un número de comprobante');
      return false;
    }
    if (formData.detalles.length === 0) {
      setError('Debe agregar al menos un producto');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }
    
    // SOLUCIÓN RADICAL: Eliminar duplicados completamente agrupando por ID 
    // y sumando las cantidades en un único objeto por producto
    const detallesToSubmit = Object.values(
      formData.detalles.reduce((acc, detalle) => {
        const id = parseInt(detalle.producto_id);
        if (!acc[id]) {
          // Producto nuevo: creamos entrada inicial
          acc[id] = {
            producto_id: id,
            cantidad: 0,
            precio_unitario: parseFloat(detalle.precio_unitario),
            subtotal: 0
          };
        }
        // Sumamos la cantidad al mismo ID
        acc[id].cantidad += parseInt(detalle.cantidad);
        // Recalculamos el subtotal
        acc[id].subtotal = acc[id].cantidad * acc[id].precio_unitario;
        return acc;
      }, {})
    ).map(det => ({
      ...det,
      cantidad: det.cantidad > 1 ? (det.cantidad / 2) : det.cantidad,
      subtotal: (det.cantidad > 1 ? (det.cantidad / 2) : det.cantidad) * det.precio_unitario
    }));

    const dataToSend = {
      ...formData,
      cliente_id: parseInt(formData.cliente_id) || null,
      empleado_id: parseInt(formData.empleado_id),
      detalles: detallesToSubmit
    };
    
    console.log('DATOS FINALES A ENVIAR:', JSON.stringify(dataToSend));

    try {
      let ventaResponse;
      if (id) {
        ventaResponse = await updateVenta(id, dataToSend);
        if (onSuccess) onSuccess('update');
      } else {
        ventaResponse = await createVenta(dataToSend);
        
        // Verificar stock bajo después de la venta
        const productosMap = productos.reduce((acc, producto) => {
          acc[producto.id] = producto;
          return acc;
        }, {});
        
        // Iterar sobre cada detalle para verificar el stock
        for (const detalle of detallesToSubmit) {
          const producto = productosMap[detalle.producto_id];
          if (producto) {
            // Calcular el stock actualizado después de la venta
            const stockActualizado = producto.stock - detalle.cantidad;
            
            // Verificar si el stock está agotado
            if (stockActualizado <= 0) {
              await crearAlertaStockAgotado({
                producto_id: detalle.producto_id,
                nombre: producto.nombre
              }, 0);
            }
            // Verificar si el stock está por debajo del mínimo
            else if (stockActualizado <= producto.stock_minimo) {
              await crearAlertaStockBajo({
                producto_id: detalle.producto_id,
                nombre: producto.nombre
              }, stockActualizado);
            }
          }
        }
        if (onSuccess) onSuccess('create');
      }
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      // Mostrar mensaje de error real si viene del backend
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error al guardar la venta. Por favor, intente nuevamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="venta-form-loading">
        <p>Cargando formulario...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="venta-form-error">
        <p>{error}</p>
        <button onClick={loadInitialData} className="btn-retry">
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="venta-form">
      <h2>{id ? 'Editar Venta' : 'Nueva Venta'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Empleado</label>
            <select 
              name="empleado_id" 
              value={formData.empleado_id} 
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map(empleado => (
                <option key={empleado.empleado_id} value={empleado.empleado_id}>
                  {empleado.nombres} {empleado.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Cliente</label>
            <select 
              name="cliente_id" 
              value={formData.cliente_id} 
              onChange={handleInputChange}
            >
              <option value="">Cliente General</option>
              {clientes.map(cliente => (
                <option key={cliente.cliente_id} value={cliente.cliente_id}>
                  {cliente.nombres} {cliente.apellidos}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Comprobante</label>
            <select 
              name="tipo_comprobante" 
              value={formData.tipo_comprobante} 
              onChange={handleInputChange}
              required
            >
              <option value="Boleta">Boleta</option>
              <option value="Factura">Factura</option>
              <option value="Ticket">Ticket</option>
            </select>
          </div>

          <div className="form-group">
            <label>Número de Comprobante</label>
            <input
              type="text"
              name="num_comprobante"
              value={formData.num_comprobante}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="fecha_venta"
              value={formData.fecha_venta}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Método de Pago</label>
            <select 
              name="metodo_pago" 
              value={formData.metodo_pago} 
              onChange={handleInputChange}
              required
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
        </div>

        <div className="detalles-section">
          <h3>Detalles de la Venta</h3>
          
          <div className="agregar-detalle">
            {/* Buscador de productos */}
            <input
              type="text"
              placeholder="Buscar producto..."
              value={productoSearch}
              onChange={e => setProductoSearch(e.target.value)}
              style={{ marginRight: 8, minWidth: 150 }}
            />
            <select 
              value={detalleTemp.producto_id} 
              onChange={handleProductoChange}
            >
              <option value="">Seleccione un producto</option>
              {productos
                .filter(producto =>
                  producto.nombre.toLowerCase().includes(productoSearch.toLowerCase())
                )
                .map(producto => (
                  <option
                    key={producto.producto_id}
                    value={producto.producto_id}
                    disabled={producto.stock_actual <= 0}
                    style={producto.stock_actual <= 0 ? { color: '#aaa', background: '#f5f5f5' } : {}}
                  >
                    {producto.nombre} - Stock: {producto.stock_actual}
                    {producto.stock_actual <= 0 ? ' (Sin stock)' : ''}
                  </option>
                ))}
            </select>
            <input
              type="number"
              name="cantidad"
              value={detalleTemp.cantidad || 1}
              onChange={handleCantidadChange}
              min={1}
              required
              disabled={!detalleTemp.producto_id}
              style={{ width: 80 }}
            />
            <button type="button" onClick={agregarDetalle} disabled={!detalleTemp.producto_id}>
              Agregar
            </button>
            {stockError && (
              <span style={{ color: 'red', marginLeft: 12 }}>{stockError}</span>
            )}
          </div>
          <table className="detalles-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formData.detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.producto_nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>S/ {parseFloat(detalle.precio_unitario).toFixed(2)}</td>
                  <td>S/ {parseFloat(detalle.subtotal).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => eliminarDetalle(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totales">
          <div className="total-item">
            <span>Subtotal:</span>
            <span>S/ {parseFloat(formData.subtotal).toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span>IGV (18%):</span>
            <span>S/ {parseFloat(formData.igv).toFixed(2)}</span>
          </div>
          <div className="total-item total">
            <span>Total:</span>
            <span>S/ {parseFloat(formData.total).toFixed(2)}</span>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={onCancel ? onCancel : () => navigate('/ventas')}>
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            {id ? 'Actualizar Venta' : 'Registrar Venta'}
          </button>
        </div>
      </form>
    </div>
  );
};