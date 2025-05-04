import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import './ProductosStyles.css';

const ProductoForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria_id: '',
    proveedor_id: '',
    requiere_receta: false,
    precio_compra: '',
    precio_venta: '',
    stock_actual: '',
    stock_minimo: '',
    fecha_vencimiento: '',
    estado: 'Activo'
  });
  const [errors, setErrors] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Actualizando las URLs para usar el puerto 5000
        const categoriasUrl = 'http://localhost:5000/api/categorias';
        const proveedoresUrl = 'http://localhost:5000/api/proveedores';

        console.log('Fetching data from:', { categoriasUrl, proveedoresUrl });

        const [categoriasRes, proveedoresRes] = await Promise.all([
          fetch(categoriasUrl),
          fetch(proveedoresUrl)
        ]);

        if (!categoriasRes.ok) {
          throw new Error(`Error al cargar categorías: ${categoriasRes.status}`);
        }
        if (!proveedoresRes.ok) {
          throw new Error(`Error al cargar proveedores: ${proveedoresRes.status}`);
        }

        const categoriasData = await categoriasRes.json();
        const proveedoresData = await proveedoresRes.json();

        console.log('Datos recibidos:', { categoriasData, proveedoresData });

        setCategorias(categoriasData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      // Convertir requiere_receta a booleano explícitamente
      const requireReceta = initialData.requiere_receta === 1 || 
                          initialData.requiere_receta === '1' || 
                          initialData.requiere_receta === true;
      
      setFormData({
        codigo: initialData.codigo || '',
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || '',
        categoria_id: initialData.categoria_id || '',
        proveedor_id: initialData.proveedor_id || '',
        requiere_receta: requireReceta,
        precio_compra: initialData.precio_compra || '',
        precio_venta: initialData.precio_venta || '',
        stock_actual: initialData.stock_actual || '',
        stock_minimo: initialData.stock_minimo || '',
        fecha_vencimiento: initialData.fecha_vencimiento || '',
        estado: initialData.estado || 'Activo'
      });
      
      console.log('Valor original de requiere_receta:', initialData.requiere_receta);
      console.log('Valor convertido de requiere_receta:', requireReceta);
    } else {
      setFormData({
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria_id: '',
        proveedor_id: '',
        requiere_receta: false,
        precio_compra: '',
        precio_venta: '',
        stock_actual: '',
        stock_minimo: '',
        fecha_vencimiento: '',
        estado: 'Activo'
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.precio_compra || isNaN(formData.precio_compra) || formData.precio_compra <= 0) {
      newErrors.precio_compra = 'El precio de compra debe ser mayor a 0';
    }
    if (!formData.precio_venta || isNaN(formData.precio_venta) || formData.precio_venta <= 0) {
      newErrors.precio_venta = 'El precio de venta debe ser mayor a 0';
    }
    if (!formData.stock_actual || isNaN(formData.stock_actual) || formData.stock_actual < 0) {
      newErrors.stock_actual = 'El stock actual debe ser mayor o igual a 0';
    }
    if (!formData.stock_minimo || isNaN(formData.stock_minimo) || formData.stock_minimo < 0) {
      newErrors.stock_minimo = 'El stock mínimo debe ser mayor o igual a 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Preprocesar datos antes de enviar
        const dataToSend = {
          ...formData,
          requiere_receta: formData.requiere_receta ? 1 : 0,
          fecha_vencimiento: formData.fecha_vencimiento ? formData.fecha_vencimiento.slice(0,10) : null
        };
        console.log('Enviando datos del formulario:', {
          ...dataToSend,
          precio_compra: parseFloat(dataToSend.precio_compra),
          precio_venta: parseFloat(dataToSend.precio_venta),
          stock_actual: parseInt(dataToSend.stock_actual),
          stock_minimo: parseInt(dataToSend.stock_minimo),
          categoria_id: dataToSend.categoria_id ? parseInt(dataToSend.categoria_id) : null,
          proveedor_id: dataToSend.proveedor_id ? parseInt(dataToSend.proveedor_id) : null,
          estado: dataToSend.estado || 'Activo'
        });

        onSave({
          ...formData,
          precio_compra: parseFloat(formData.precio_compra),
          precio_venta: parseFloat(formData.precio_venta),
          stock_actual: parseInt(formData.stock_actual),
          stock_minimo: parseInt(formData.stock_minimo),
          categoria_id: formData.categoria_id ? parseInt(formData.categoria_id) : null,
          proveedor_id: formData.proveedor_id ? parseInt(formData.proveedor_id) : null,
          estado: formData.estado || 'Activo'
        });
      } catch (error) {
        console.error('Error al procesar el formulario:', error);
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'requiere_receta') {
      console.log('Checkbox requiere_receta cambiado a:', checked);
      // Forzar actualización inmediata para el checkbox
      setFormData(prev => ({
        ...prev,
        requiere_receta: checked
      }));
      return; // Salir para evitar la actualización general abajo
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error al cargar los datos: {error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="codigo">Código *</label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className={errors.codigo ? 'error' : ''}
          />
          {errors.codigo && <span className="error-message">{errors.codigo}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="categoria_id">Categoría *</label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.categoria_id} value={categoria.categoria_id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="proveedor_id">Proveedor *</label>
          <select
            id="proveedor_id"
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(proveedor => (
              <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="precio_compra">Precio Compra *</label>
          <input
            type="number"
            id="precio_compra"
            name="precio_compra"
            value={formData.precio_compra}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.precio_compra ? 'error' : ''}
          />
          {errors.precio_compra && <span className="error-message">{errors.precio_compra}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="precio_venta">Precio Venta *</label>
          <input
            type="number"
            id="precio_venta"
            name="precio_venta"
            value={formData.precio_venta}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.precio_venta ? 'error' : ''}
          />
          {errors.precio_venta && <span className="error-message">{errors.precio_venta}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="stock_actual">Stock Actual *</label>
          <input
            type="number"
            id="stock_actual"
            name="stock_actual"
            value={formData.stock_actual}
            onChange={handleChange}
            min="0"
            className={errors.stock_actual ? 'error' : ''}
          />
          {errors.stock_actual && <span className="error-message">{errors.stock_actual}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="stock_minimo">Stock Mínimo *</label>
          <input
            type="number"
            id="stock_minimo"
            name="stock_minimo"
            value={formData.stock_minimo}
            onChange={handleChange}
            min="0"
            className={errors.stock_minimo ? 'error' : ''}
          />
          {errors.stock_minimo && <span className="error-message">{errors.stock_minimo}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fecha_vencimiento">Fecha Vencimiento</label>
          <input
            type="date"
            id="fecha_vencimiento"
            name="fecha_vencimiento"
            value={formData.fecha_vencimiento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Descontinuado">Descontinuado</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
        <div className="form-group">
          <label className="checkbox-label" htmlFor="requiere_receta">
            <input
              id="requiere_receta"
              type="checkbox"
              name="requiere_receta"
              checked={Boolean(formData.requiere_receta)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                console.log('Checkbox clicked, nuevo valor:', isChecked);
                setFormData(prev => ({
                  ...prev,
                  requiere_receta: isChecked
                }));
              }}
            />
            Requiere Receta Médica
          </label>
        </div>
        <div className="form-group full-width">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          {/* <FaTimes /> */} Cancelar
        </button>
        <button type="submit" className="btn-primary">
          {/* <FaSave /> */} Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductoForm; 