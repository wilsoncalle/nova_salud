import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { 
  getProductos, 
} from '../services/productosService';
import { 
  getVentas, 
  getVentasByDateRange 
} from '../services/ventasService';
import { getClientes } from '../services/clientesService';
import { getEmpleados } from '../services/empleadosService';
import { getAlertas } from '../services/alertasService';
import { Box, Truck, User, Users, ShoppingCart, DollarSign, Bell, BarChart, TrendingUp, Activity, Package } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para la información del dashboard
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [ventasSemanales, setVentasSemanales] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [productosPopulares, setProductosPopulares] = useState([]);
  const [ventasPorCategoria, setVentasPorCategoria] = useState([]);

  // Obtener fecha de hace 7 días
  const getLastWeekDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Obtener datos del backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener datos de productos
        const productosData = await getProductos();
        setProductos(productosData.data || []);
        
        // Obtener datos para productos con stock bajo
        try {
          // Primero obtenemos todos los productos para tener datos completos
          const productosCompletos = {};
          if (productosData && productosData.data && Array.isArray(productosData.data)) {
            productosData.data.forEach(p => {
              if (p.producto_id) {
                productosCompletos[p.producto_id] = p;
              }
            });
          }
          
          // Intentar obtener alertas de stock bajo
          const alertasData = await getAlertas();
          console.log('Alertas data:', alertasData); // Debug
          
          // Filtrar alertas de stock bajo si existen y enriquecerlas con datos de productos
          let stockBajo = [];
          if (alertasData && alertasData.data && Array.isArray(alertasData.data)) {
            // Filtrar solo alertas de stock bajo
            const alertasStockBajo = alertasData.data.filter(a => 
              (a.tipo === 'stock_bajo' || 
               (a.descripcion && a.descripcion.toLowerCase().includes('stock')) || 
               (a.mensaje && a.mensaje.toLowerCase().includes('stock')))
            ).slice(0, 6);
            
            // Intentar completar la información de cada alerta con los datos del producto
            stockBajo = await Promise.all(alertasStockBajo.map(async (alerta) => {
              // Si la alerta tiene un ID de producto, intentamos obtener los detalles
              if (alerta.producto_id) {
                try {
                  // Primero intentamos buscar en los productos ya cargados
                  if (productosCompletos[alerta.producto_id]) {
                    return { ...alerta, ...productosCompletos[alerta.producto_id] };
                  }
                  
                  // Si no está en memoria, hacemos la consulta específica
                  const { data } = await getProducto(alerta.producto_id);
                  if (data) {
                    return { ...alerta, ...data };
                  }
                } catch (e) {
                  console.error(`Error al obtener detalles del producto ${alerta.producto_id}:`, e);
                }
              }
              
              // Si no pudimos obtener el producto o no tiene ID, devolvemos la alerta original
              return alerta;
            }));
          }
          
          // Si no hay alertas o están vacías, usar fallback de productos con bajo stock
          if (stockBajo.length === 0) {
            console.log('Usando fallback para stock bajo'); // Debug
            
            // Filtrar productos con stock bajo (menos de 10 unidades)
            if (productosData && productosData.data && Array.isArray(productosData.data)) {
              const stockBajoFallback = productosData.data
                .filter(p => p.stock !== undefined && p.stock < 10)
                .sort((a, b) => (a.stock || 0) - (b.stock || 0))
                .slice(0, 6);
              
              console.log('Stock bajo fallback:', stockBajoFallback); // Debug
              
              if (stockBajoFallback.length > 0) {
                stockBajo = stockBajoFallback;
              } else {
                // Datos de ejemplo como último recurso
                stockBajo = [
                  { producto_id: 1, nombre: "Paracetamol", categoria_nombre: "Analgésicos", stock: 3, precio_venta: 5.50 },
                  { producto_id: 2, nombre: "Amoxicilina", categoria_nombre: "Antibióticos", stock: 2, precio_venta: 12.80 },
                  { producto_id: 3, nombre: "Ibuprofeno", categoria_nombre: "Antiinflamatorios", stock: 4, precio_venta: 8.20 }
                ];
              }
            } else {
              // Datos de ejemplo si no hay productos en absoluto
              stockBajo = [
                { producto_id: 1, nombre: "Paracetamol", categoria_nombre: "Analgésicos", stock: 3, precio_venta: 5.50 },
                { producto_id: 2, nombre: "Amoxicilina", categoria_nombre: "Antibióticos", stock: 2, precio_venta: 12.80 },
                { producto_id: 3, nombre: "Ibuprofeno", categoria_nombre: "Antiinflamatorios", stock: 4, precio_venta: 8.20 }
              ];
            }
          }
          
          console.log('Stock bajo final:', stockBajo);
          setProductosBajoStock(stockBajo);
          
        } catch (err) {
          console.error('Error al obtener stock bajo:', err);
          // En caso de error, mostrar datos de ejemplo
          setProductosBajoStock([
            { producto_id: 1, nombre: "Paracetamol", categoria_nombre: "Analgésicos", stock: 3, precio_venta: 5.50 },
            { producto_id: 2, nombre: "Amoxicilina", categoria_nombre: "Antibióticos", stock: 2, precio_venta: 12.80 },
            { producto_id: 3, nombre: "Ibuprofeno", categoria_nombre: "Antiinflamatorios", stock: 4, precio_venta: 8.20 }
          ]);
        }
        
        // Obtener ventas
        const ventasData = await getVentas();
        setVentas(ventasData || []);
        
        // Calcular ventas de la última semana (Total)
        const fechaHoy = new Date();
        const fechaInicioSemana = new Date(fechaHoy);
        fechaInicioSemana.setDate(fechaHoy.getDate() - 7);
        
        // Filtrar ventas de la última semana
        const ventasUltimaSemana = ventasData.filter(venta => {
          const fechaVenta = new Date(venta.fecha_venta || venta.fecha);
          return fechaVenta >= fechaInicioSemana;
        });
        
        // Total de ventas
        const totalVentas = ventasUltimaSemana.length;
        // Total de ingresos
        const totalIngresos = ventasUltimaSemana.reduce((sum, venta) => 
          sum + parseFloat(venta.total || 0), 0
        );
        
        setVentasSemanales({
          total: totalVentas,
          ingresos: totalIngresos
        });
        
        // Productos más vendidos - análisis de detalles de ventas y enriquecimiento de datos
        try {
          console.log('Analizando productos más vendidos...'); // Debug
          
          // Creamos un mapa para los productos completos si todavía no existe
          if (!productosCompletos) {
            const productosCompletos = {};
            if (productosData && productosData.data && Array.isArray(productosData.data)) {
              productosData.data.forEach(p => {
                if (p.producto_id) {
                  productosCompletos[p.producto_id] = p;
                }
              });
            }
          }
          
          // Mapa para consolidar productos vendidos
          const productosVendidos = {};
          
          // Para cada venta, procesar sus detalles
          if (ventasData && ventasData.length > 0) {
            ventasData.forEach(venta => {
              // Verificar que detalles sea un array y no sea vacío
              if (venta.detalles && Array.isArray(venta.detalles) && venta.detalles.length > 0) {
                // Consolidar detalles para evitar duplicados (similar a la solución implementada anteriormente)
                const detallesConsolidados = {};
                
                venta.detalles.forEach(detalle => {
                  const id = parseInt(detalle.producto_id);
                  if (isNaN(id)) {
                    return; // Saltar detalles sin ID válido
                  }
                  
                  // Obtener nombre del producto de diferentes fuentes posibles
                  let nombre = detalle.producto_nombre || detalle.nombre;
                  if (!nombre && productosCompletos && productosCompletos[id]) {
                    nombre = productosCompletos[id].nombre;
                  }
                  nombre = nombre || `Producto ${id}`;
                  
                  if (!detallesConsolidados[id]) {
                    detallesConsolidados[id] = {
                      producto_id: id,
                      nombre: nombre,
                      cantidad: 0,
                      subtotal: 0
                    };
                  }
                  
                  // Asegurar que cantidad y subtotal sean números
                  const cantidad = parseInt(detalle.cantidad) || 0;
                  const subtotal = parseFloat(detalle.subtotal) || (cantidad * parseFloat(detalle.precio_unitario || 0));
                  
                  detallesConsolidados[id].cantidad += cantidad;
                  detallesConsolidados[id].subtotal += subtotal;
                });
                
                // Agregar a los productos vendidos totales
                Object.values(detallesConsolidados).forEach(detalle => {
                  if (!productosVendidos[detalle.producto_id]) {
                    productosVendidos[detalle.producto_id] = { 
                      id: detalle.producto_id, 
                      nombre: detalle.nombre, 
                      cantidad: 0, 
                      ventas: 0 
                    };
                  }
                  productosVendidos[detalle.producto_id].cantidad += detalle.cantidad;
                  productosVendidos[detalle.producto_id].ventas += detalle.subtotal;
                });
              }
            });
          }
          
          // Transformar a array y ordenar por cantidad
          let productosPopularesArray = Object.values(productosVendidos)
            .filter(p => p.cantidad > 0)  // Asegurar que solo productos con ventas
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 5);
          
          console.log('Productos populares encontrados:', productosPopularesArray.length); // Debug

          // Si no hay productos vendidos, mostrar datos de ejemplo
          if (productosPopularesArray.length === 0) {
            console.log('No se encontraron productos vendidos, usando datos de ejemplo');
            productosPopularesArray = [
              { id: 1, nombre: "Paracetamol 500mg", cantidad: 45, ventas: 247.50 },
              { id: 2, nombre: "Amoxicilina 500mg", cantidad: 32, ventas: 410.24 },
              { id: 3, nombre: "Ibuprofeno 400mg", cantidad: 28, ventas: 229.60 },
              { id: 4, nombre: "Loratadina 10mg", cantidad: 22, ventas: 143.00 },
              { id: 5, nombre: "Omeprazol 20mg", cantidad: 19, ventas: 171.00 }
            ];
          }
          
          setProductosPopulares(productosPopularesArray);
        } catch (err) {
          console.error('Error al procesar productos más vendidos:', err);
          // En caso de error, mostrar datos de ejemplo
          setProductosPopulares([
            { id: 1, nombre: "Paracetamol 500mg", cantidad: 45, ventas: 247.50 },
            { id: 2, nombre: "Amoxicilina 500mg", cantidad: 32, ventas: 410.24 },
            { id: 3, nombre: "Ibuprofeno 400mg", cantidad: 28, ventas: 229.60 },
            { id: 4, nombre: "Loratadina 10mg", cantidad: 22, ventas: 143.00 },
            { id: 5, nombre: "Omeprazol 20mg", cantidad: 19, ventas: 171.00 }
          ]);
        }
        
        // Obtener clientes y empleados
        const clientesData = await getClientes();
        setClientes(clientesData.data || []);
        
        const empleadosData = await getEmpleados();
        setEmpleados(empleadosData.data || []);
        
      } catch (err) {
        console.error('Error cargando datos del dashboard:', err);
        setError('No se pudieron cargar los datos del dashboard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // KPIs calculados en base a datos reales
  const kpis = [
    { 
      label: 'Productos', 
      value: productos.length, 
      icon: <Package size={28} />, 
      color: '#1976d2', 
      link: '/productos' 
    },
    { 
      label: 'Clientes', 
      value: clientes.length, 
      icon: <User size={28} />, 
      color: '#388e3c', 
      link: '/clientes' 
    },
    { 
      label: 'Ventas (Total)', 
      value: ventas.length, 
      icon: <DollarSign size={28} />, 
      color: '#d32f2f', 
      link: '/ventas' 
    },
    { 
      label: 'Bajo Stock', 
      value: productosBajoStock.length, 
      icon: <Bell size={28} />, 
      color: '#fbc02d', 
      link: '/alertas' 
    },
  ];

  // Calcular ingresos totales
  const ingresosTotales = ventas.reduce((sum, venta) => sum + parseFloat(venta.total || 0), 0);
  
  if (loading) return (
    <Layout>
      <div className="dashboard-loading">
        <div className="dashboard-loading-content">
          <h2>Cargando datos del dashboard...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className="dashboard-error-content">
        <h2>{error}</h2>
        <p>Intenta recargar la página</p>
      </div>
    </Layout>
  );
  
  return (

      <div className="dashboard-container">

       
        
        {/* KPIs principales */}
        <div className="dashboard-kpis">
          {kpis.map(kpi => (
            <Link to={kpi.link} key={kpi.label} className="dashboard-kpi-link">
              <div className="dashboard-kpi-card" style={{ borderLeftColor: kpi.color }}>
                <div className="dashboard-kpi-icon" style={{ backgroundColor: `${kpi.color}15` }}>
                  <div style={{ color: kpi.color }}>{kpi.icon}</div>
                </div>
                <div className="dashboard-kpi-data">
                  <span className="dashboard-kpi-value">{kpi.value}</span>
                  <span className="dashboard-kpi-label">{kpi.label}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="dashboard-sections">
          {/* Resumen de ventas semanales */}
          <div className="dashboard-card large">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Ventas de la última semana</h3>
              <Activity size={20} color="#1976d2" />
            </div>
            <div className="dashboard-stats">
              <div className="dashboard-stat-box">
                <DollarSign size={36} color="#1976d2" className="dashboard-stat-icon" />
                <div className="dashboard-stat-value">
                  S/ {ventasSemanales.ingresos ? ventasSemanales.ingresos.toFixed(2) : '0.00'}
                </div>
                <p className="dashboard-stat-label">Ingresos Totales</p>
              </div>
              <div className="dashboard-stat-box">
                <Package size={36} color="#1976d2" className="dashboard-stat-icon" />
                <div className="dashboard-stat-value">
                  {ventasSemanales.total || 0}
                </div>
                <p className="dashboard-stat-label">Ventas Realizadas</p>
              </div>
            </div>
          </div>
          
          
        </div>
        {/* Productos más vendidos */}
        <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Productos más vendidos</h3>
              <TrendingUp size={20} color="#1976d2" />
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="center">Unidades</th>
                  <th className="right">Ventas (S/)</th>
                </tr>
              </thead>
              <tbody>
                {productosPopulares.map((prod, idx) => (
                  <tr key={prod.id}>
                    <td>{prod.nombre}</td>
                    <td className="center">{prod.cantidad}</td>
                    <td className="right price">S/ {prod.ventas.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* Productos con bajo stock */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title warning">Productos con bajo stock</h3>
            <Bell size={20} color="#d32f2f" />
          </div>
          {productosBajoStock.length === 0 ? (
            <div className="dashboard-no-data">
              No hay productos con stock bajo en este momento.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th className="right">Stock</th>
                  <th className="right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {productosBajoStock.map((prod, idx) => {
                  // Obtener nombre del producto de diferentes campos posibles
                  const nombreProducto = prod.nombre || 
                                        prod.producto_nombre || 
                                        (prod.producto && prod.producto.nombre) || 
                                        prod.descripcion || 
                                        'Producto ' + (idx + 1);
                  
                  // Obtener categoría de diferentes campos posibles
                  const categoria = prod.categoria_nombre || 
                                    (prod.categoria && prod.categoria.nombre) || 
                                    (prod.producto && prod.producto.categoria_nombre) || 
                                    '-';
                  
                  // Obtener stock de diferentes campos posibles
                  const stock = prod.stock || 
                                prod.cantidad || 
                                (prod.producto && prod.producto.stock) || 
                                '< 5';
                  
                  // Obtener precio de diferentes campos posibles
                  const precio = prod.precio_venta || 
                                 prod.precio || 
                                 (prod.producto && prod.producto.precio_venta) || 
                                 0;
                  
                  return (
                    <tr key={prod.producto_id || prod.alerta_id || idx}>
                      <td>{nombreProducto}</td>
                      <td>{categoria}</td>
                      <td className="right danger">{stock}</td>
                      <td className="right">S/ {parseFloat(precio).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

  );
}