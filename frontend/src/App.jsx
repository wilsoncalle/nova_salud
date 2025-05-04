import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AlertasProvider } from './context/AlertasContext';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';
// Importa vistas de Categoría
import CategoriaList from './components/categoria/CategoriaList';
import CategoriaForm from './components/categoria/CategoriaForm';
import CategoriaModal from './components/categoria/CategoriaModal';

// Importa vistas de Cliente
import ClienteList from './components/cliente/ClienteList';
import ClienteForm from './components/cliente/ClienteForm';
import ClienteModal from './components/cliente/ClienteModal';

// Importa vistas de Productos
import ProductoList from './components/productos/ProductoList';
import ProductoForm from './components/productos/ProductoForm';
import ProductoModal from './components/productos/ProductoModal';

// Importa vistas de Proveedores
import ProveedorList from './components/proveedores/ProveedorList';
import ProveedorForm from './components/proveedores/ProveedorForm';
import ProveedorModal from './components/proveedores/ProveedorModal';

// Importa vistas de Empleados
import EmpleadoList from './components/empleados/EmpleadoList';
import EmpleadoForm from './components/empleados/EmpleadoForm';
import EmpleadoModal from './components/empleados/EmpleadoModal';

// Importa nuevos componentes de Compras
import ComprasList from './components/compras/ComprasList';
import CompraForm from './components/compras/CompraForm';
import CompraModal from './components/compras/CompraModal';
// Importa vistas de Alertas
import AlertaList from './components/alertas/AlertaList';
import AlertaCard from './components/alertas/AlertaCard';
import AlertaForm from './components/alertas/AlertaForm';
import AlertaModal from './components/alertas/AlertaModal';

// Importa vistas de Ventas
import VentaCard from './components/venta/VentaCard';
import VentaList from './components/venta/VentaList';
import VentaForm from './components/venta/VentaForm';
import VentaModal from './components/venta/VentaModal';
import VentaDetails from './components/venta/VentaDetails';

import { getProductos, createProducto, updateProducto, deleteProducto } from './services/productosService';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from './services/proveedoresService';
import { getEmpleados } from './services/empleadosService';
import { getClientes } from './services/clientesService';
import { getVentas } from './services/ventasService';
import { getCategorias, updateCategoria, createCategoria } from './services/categoriasService';
import { getCompras, createCompra, updateCompra, deleteCompra } from './services/comprasService';

function App() {
  // Estado para Ventas
  const [ventas, setVentas] = useState([]);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [isVentaModalOpen, setIsVentaModalOpen] = useState(false);
  const [isEditingVenta, setIsEditingVenta] = useState(false);
  // Estado para Compras
  const [compras, setCompras] = useState([]);
  const [currentCompra, setCurrentCompra] = useState(null);
  const [isCompraModalOpen, setIsCompraModalOpen] = useState(false);
  const [isEditingCompra, setIsEditingCompra] = useState(false);
  const [isCompraDetails, setIsCompraDetails] = useState(false);
  const [compraEditId, setCompraEditId] = useState(null);

  // Estado para Categoría
  const [categorias, setCategorias] = useState([]);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [isEditingCategoria, setIsEditingCategoria] = useState(false);
  // Estado para Productos
  const [productos, setProductos] = useState([]);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false);
  const [isEditingProducto, setIsEditingProducto] = useState(false);
  // Estado para Proveedores
  const [proveedores, setProveedores] = useState([]);
  const [currentProveedor, setCurrentProveedor] = useState(null);
  const [isProveedorModalOpen, setIsProveedorModalOpen] = useState(false);
  const [isEditingProveedor, setIsEditingProveedor] = useState(false);
  // Estado para Empleados
  const [empleados, setEmpleados] = useState([]);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);
  const [isEmpleadoModalOpen, setIsEmpleadoModalOpen] = useState(false);
  const [isEditingEmpleado, setIsEditingEmpleado] = useState(false);
  const [isEmpleadoDetails, setIsEmpleadoDetails] = useState(false);
  // Estado para Clientes
  const [clientes, setClientes] = useState([]);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false);
  const [isEditingCliente, setIsEditingCliente] = useState(false);
  const [isClienteDetails, setIsClienteDetails] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos de cada entidad al entrar a su vista
  // Puedes optimizar con SWR, React Query, etc. en el futuro
  useEffect(() => {
    // Precarga productos
    getProductos().then(res => setProductos(res.data || []));
    getProveedores().then(res => setProveedores(res.data || []));
    getEmpleados().then(res => setEmpleados(res.data || []));
    getClientes().then(res => setClientes(res.data || []));
    getVentas().then(res => setVentas(res.data || []));
    getCategorias().then(res => setCategorias(res.data || []));
    getCompras().then(res => setCompras(res.data || []));
  }, []);

  // Handlers para Proveedores
  const [isProveedorDetails, setIsProveedorDetails] = useState(false);

  const handleAddProveedor = () => {
    setCurrentProveedor(null);
    setIsEditingProveedor(false);
    setIsProveedorDetails(false);
    setIsProveedorModalOpen(true);
  };
  const handleEditProveedor = (prov) => {
    setCurrentProveedor(prov);
    setIsEditingProveedor(true);
    setIsProveedorDetails(false);
    setIsProveedorModalOpen(true);
  };
  const handleDetailsProveedor = (prov) => {
    setCurrentProveedor(prov);
    setIsEditingProveedor(false);
    setIsProveedorDetails(true);
    setIsProveedorModalOpen(true);
  };
  const handleDeleteProveedor = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este proveedor?')) {
      try {
        setLoading(true);
        await deleteProveedor(id);
        toast.success('Proveedor eliminado');
        setProveedores(proveedores.filter(p => p.proveedor_id !== id));
      } catch (err) {
        toast.error('Error al eliminar el proveedor');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSaveProveedor = async (data) => {
    setLoading(true);
    try {
      if (isEditingProveedor && currentProveedor) {
        await updateProveedor(currentProveedor.proveedor_id, data);
        toast.success('Proveedor actualizado');
      } else {
        await createProveedor(data);
        toast.success('Proveedor creado');
      }
      setIsProveedorModalOpen(false);
      // Recargar proveedores
      const res = await getProveedores();
      setProveedores(res.data || []);
    } catch (err) {
      toast.error('Error al guardar el proveedor');
    } finally {
      setLoading(false);
    }
  };

  // Handlers para Productos
  const handleAddProducto = () => {
    setCurrentProducto(null);
    setIsEditingProducto(false);
    setIsProductoModalOpen(true);
  };
  const handleEditProducto = (prod) => {
    setCurrentProducto(prod);
    setIsEditingProducto(true);
    setIsProductoModalOpen(true);
  };
  const handleDeleteProducto = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        setLoading(true);
        await require('./services/productosService').deleteProducto(id);
        toast.success('Producto eliminado');
        setProductos(productos.filter(p => p.producto_id !== id));
      } catch (err) {
        toast.error('Error al eliminar el producto');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSaveProducto = async (data) => {
    setLoading(true);
    try {
      console.log('handleSaveProducto ejecutado', data);
      if (isEditingProducto && currentProducto) {
        console.log('Llamando a updateProducto', currentProducto.producto_id, data);
        await updateProducto(currentProducto.producto_id, data);
        toast.success('Producto actualizado');
      } else {
        console.log('Llamando a createProducto', data);
        await createProducto(data);
        toast.success('Producto creado');
      }
      setIsProductoModalOpen(false);
      // Recargar productos
      const res = await getProductos();
      setProductos(res.data || []);
    } catch (err) {
      toast.error('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  // Handlers para Empleados
  const handleAddEmpleado = () => {
    setCurrentEmpleado(null);
    setIsEditingEmpleado(false);
    setIsEmpleadoDetails(false);
    setIsEmpleadoModalOpen(true);
  };
  const handleEditEmpleado = (emp) => {
    setCurrentEmpleado(emp);
    setIsEditingEmpleado(true);
    setIsEmpleadoDetails(false);
    setIsEmpleadoModalOpen(true);
  };
  const handleDetailsEmpleado = (emp) => {
    setCurrentEmpleado(emp);
    setIsEditingEmpleado(false);
    setIsEmpleadoDetails(true);
    setIsEmpleadoModalOpen(true);
  };
  const handleDeleteEmpleado = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este empleado?')) {
      try {
        setLoading(true);
        // await deleteEmpleado(id);
        toast.success('Empleado eliminado');
        setEmpleados(empleados.filter(e => e.empleado_id !== id));
      } catch (err) {
        toast.error('Error al eliminar el empleado');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSaveEmpleado = async (data) => {
    setLoading(true);
    try {
      if (isEditingEmpleado && currentEmpleado) {
        // await updateEmpleado(currentEmpleado.empleado_id, data);
        toast.success('Empleado actualizado');
      } else {
        // await createEmpleado(data);
        toast.success('Empleado creado');
      }
      setIsEmpleadoModalOpen(false);
      // Recargar empleados
      // const res = await getEmpleados();
      // setEmpleados(res.data || []);
    } catch (err) {
      toast.error('Error al guardar el empleado');
    } finally {
      setLoading(false);
    }
  };

  // Handlers para Clientes
  const handleAddCliente = () => {
    setCurrentCliente(null);
    setIsEditingCliente(false);
    setIsClienteDetails(false);
    setIsClienteModalOpen(true);
  };
  const handleEditCliente = (cli) => {
    setCurrentCliente(cli);
    setIsEditingCliente(true);
    setIsClienteDetails(false);
    setIsClienteModalOpen(true);
  };
  const handleDetailsCliente = (cli) => {
    setCurrentCliente(cli);
    setIsEditingCliente(false);
    setIsClienteDetails(true);
    setIsClienteModalOpen(true);
  };
  const handleDeleteCliente = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      try {
        setLoading(true);
        // await deleteCliente(id);
        toast.success('Cliente eliminado');
        setClientes(clientes.filter(c => c.cliente_id !== id));
      } catch (err) {
        toast.error('Error al eliminar el cliente');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSaveCliente = async (data) => {
    setLoading(true);
    try {
      if (isEditingCliente && currentCliente) {
        // await updateCliente(currentCliente.cliente_id, data);
        toast.success('Cliente actualizado');
      } else {
        // await createCliente(data);
        toast.success('Cliente creado');
      }
      setIsClienteModalOpen(false);
      // Recargar clientes
      // const res = await getClientes();
      // setClientes(res.data || []);
    } catch (err) {
      toast.error('Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  // Handlers para Categoría
  const handleAddCategoria = () => {
    setCurrentCategoria(null);
    setIsEditingCategoria(false);
    setIsCategoriaModalOpen(true);
  };
  const handleEditCategoria = (cat) => {
    setCurrentCategoria(cat);
    setIsEditingCategoria(true);
    setIsCategoriaModalOpen(true);
  };
  const handleDeleteCategoria = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta categoría?')) {
      // Aquí deberías llamar a tu servicio de eliminación
      // await deleteCategoria(id);
      toast.success('Categoría eliminada');
      setCategorias(categorias.filter(c => c.categoria_id !== id));
    }
  };
  const handleSaveCategoria = async (data) => {
    setLoading(true);
    try {
      if (isEditingCategoria && currentCategoria) {
        await updateCategoria(currentCategoria.categoria_id, data);
        toast.success('Categoría actualizada');
      } else {
        await createCategoria(data);
        toast.success('Categoría creada');
      }
      setIsCategoriaModalOpen(false);
      // Recargar categorías
      const res = await getCategorias();
      setCategorias(res.data || []);
    } catch (err) {
      toast.error('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertasProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          {loading && <div style={{textAlign:'center'}}>Cargando...</div>}
          {error && <div style={{color:'red', textAlign:'center', marginBottom:16}}>{error}</div>}
          <Routes>
            <Route path="/" element={<Navigate to="/productos" />} />
            <Route path="/productos" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Productos</h2>
                  <button className="btn-primary" onClick={handleAddProducto}>Nuevo Producto</button>
                </div>
                <ProductoList
                  productos={productos}
                  onEdit={handleEditProducto}
                  onDelete={handleDeleteProducto}
                />
                <ProductoModal isOpen={isProductoModalOpen} onClose={()=>setIsProductoModalOpen(false)}>
                  <ProductoForm
                    initialData={isEditingProducto ? currentProducto : null}
                    onSave={handleSaveProducto}
                    onCancel={()=>setIsProductoModalOpen(false)}
                  />
                </ProductoModal>
              </div>
            } />
            <Route path="/ventas" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Ventas</h2>
                  <button className="btn-primary" onClick={() => {
                    setCurrentVenta(null);
                    setIsEditingVenta(false);
                    setIsVentaModalOpen(true);
                  }}>Nueva Venta</button>
                </div>
                <VentaList
                  ventas={ventas}
                  onEdit={venta => {
                    setCurrentVenta(venta);
                    setIsEditingVenta(true);
                    setIsVentaModalOpen(true);
                  }}
                  onDelete={async (venta) => {
                    if(window.confirm('¿Seguro que deseas eliminar esta venta?')) {
                      try {
                        await deleteVenta(venta.venta_id);
                        setVentas(ventas.filter(v => v.venta_id !== venta.venta_id));
                        toast.success('Venta eliminada');
                      } catch {
                        toast.error('Error al eliminar la venta');
                      }
                    }
                  }}
                />
                <VentaModal isOpen={isVentaModalOpen} onClose={()=>setIsVentaModalOpen(false)}>
                  <VentaForm
                    id={currentVenta ? currentVenta.venta_id : null}
                    onSuccess={async (tipo) => {
                      toast.success(tipo === 'update' ? 'Venta actualizada' : 'Venta creada');
                      setIsVentaModalOpen(false);
                      const res = await getVentas();
                      setVentas(res.data || []);
                    }}
                    onCancel={()=>setIsVentaModalOpen(false)}
                    readOnly={false}
                  />
                </VentaModal>
              </div>
            } />
            <Route path="/ventas/:id" element={<VentaDetails />} />
            <Route path="/compras" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Compras</h2>
                  <button className="btn-primary" onClick={() => setCompraEditId('nuevo')}>Nueva Compra</button>
                </div>
                <ComprasList 
                  compras={compras}
                  onEdit={(compra) => setCompraEditId(compra.compra_id)}
                  onDelete={async (id) => {
                    try {
                      await deleteCompra(id);
                      toast.success('Compra eliminada');
                      const res = await getCompras();
                      setCompras(res.data || []);
                    } catch (err) {
                      toast.error('Error al eliminar la compra');
                    }
                  }}
                  onDetails={(compra) => {
                    setCurrentCompra(compra);
                    setIsEditingCompra(false);
                    setIsCompraDetails(true);
                    setIsCompraModalOpen(true);
                  }}
                />
                
                <CompraModal isOpen={!!compraEditId} onClose={() => setCompraEditId(null)}>
                  {compraEditId && (
                    <CompraForm
                      id={compraEditId !== 'nuevo' ? compraEditId : null}
                      onSuccess={() => {
                        setCompraEditId(null);
                        toast.success(compraEditId !== 'nuevo' ? 'Compra actualizada' : 'Compra creada');
                        getCompras().then(res => setCompras(res.data || []));
                      }}
                      onCancel={() => setCompraEditId(null)}
                    />
                  )}
                </CompraModal>
              </div>
            } />
            <Route path="/clientes" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Clientes</h2>
                  <button className="btn-primary" onClick={handleAddCliente}>Nuevo Cliente</button>
                </div>
                <ClienteList
                  clientes={clientes}
                  onEdit={handleEditCliente}
                  onDelete={handleDeleteCliente}
                  onDetails={handleDetailsCliente}
                />
                <ClienteModal isOpen={isClienteModalOpen} onClose={()=>setIsClienteModalOpen(false)}>
                  <ClienteForm
                    cliente={currentCliente}
                    onSubmit={handleSaveCliente}
                    onCancel={()=>setIsClienteModalOpen(false)}
                    readOnly={isClienteDetails}
                  />
                </ClienteModal>
              </div>
            } />
            <Route path="/empleados" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Empleados</h2>
                  <button className="btn-primary" onClick={handleAddEmpleado}>Nuevo Empleado</button>
                </div>
                <EmpleadoList
                  empleados={empleados}
                  onEdit={handleEditEmpleado}
                  onDelete={handleDeleteEmpleado}
                  onDetails={handleDetailsEmpleado}
                />
                <EmpleadoModal isOpen={isEmpleadoModalOpen} onClose={()=>setIsEmpleadoModalOpen(false)}>
                  <EmpleadoForm
                    empleado={currentEmpleado}
                    onSubmit={handleSaveEmpleado}
                    onCancel={()=>setIsEmpleadoModalOpen(false)}
                    readOnly={isEmpleadoDetails}
                  />
                </EmpleadoModal>
              </div>
            } />
            <Route path="/proveedores" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Proveedores</h2>
                  <button className="btn-primary" onClick={handleAddProveedor}>Nuevo Proveedor</button>
                </div>
                <ProveedorList
                  proveedores={proveedores}
                  onEdit={handleEditProveedor}
                  onDelete={handleDeleteProveedor}
                  onDetails={handleDetailsProveedor}
                />
                <ProveedorModal isOpen={isProveedorModalOpen} onClose={()=>setIsProveedorModalOpen(false)}>
                  <ProveedorForm
                    initialData={currentProveedor}
                    onSave={handleSaveProveedor}
                    onCancel={()=>setIsProveedorModalOpen(false)}
                    readOnly={isProveedorDetails}
                  />
                </ProveedorModal>
              </div>
            } />
            <Route path="/categorias" element={
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <h2 style={{margin:0}}>Categorías</h2>
                  <button className="btn-primary" onClick={handleAddCategoria}>Nueva Categoría</button>
                </div>
                <CategoriaList
                  categorias={categorias}
                  onEdit={handleEditCategoria}
                  onDelete={handleDeleteCategoria}
                />
                <CategoriaModal isOpen={isCategoriaModalOpen} onClose={()=>setIsCategoriaModalOpen(false)}>
                  <CategoriaForm
                    initialData={isEditingCategoria ? currentCategoria : null}
                    onSave={handleSaveCategoria}
                    onCancel={()=>setIsCategoriaModalOpen(false)}
                  />
                </CategoriaModal>
              </div>
            } />
            <Route path="/alertas" element={<AlertaList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Layout>
    </AlertasProvider>
  );
}

export default App;


