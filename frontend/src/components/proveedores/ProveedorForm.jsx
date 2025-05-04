import React, { useState, useEffect } from 'react';
import './ProveedoresStyles.css';

export default function ProveedorForm({ proveedor = null, onSubmit, onCancel = () => {}, readOnly = false }) {
  const [formData, setFormData] = useState({
    nombre: '',
    ruc: '',
    telefono: '',
    email: '',
    direccion: '',
    contacto_nombre: '',
    estado: 'Activo'
  });

  useEffect(() => {
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre || '',
        ruc: proveedor.ruc || '',
        telefono: proveedor.telefono || '',
        email: proveedor.email || '',
        direccion: proveedor.direccion || '',
        contacto_nombre: proveedor.contacto_nombre || '',
        estado: proveedor.estado || 'Activo'
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="proveedor-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
        <div className="form-group">
          <label>RUC</label>
          <input
            type="text"
            name="ruc"
            value={formData.ruc}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        <div className="form-group">
          <label>Nombre de Contacto</label>
          <input
            type="text"
            name="contacto_nombre"
            value={formData.contacto_nombre}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            disabled={readOnly}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        {!readOnly && (
          <button type="submit" className="btn-submit">
            {proveedor ? 'Actualizar' : 'Crear'} Proveedor
          </button>
        )}
        <button type="button" className="btn-cancel" onClick={onCancel}>
          {readOnly ? 'Cerrar' : 'Cancelar'}
        </button>
      </div>
    </form>
  );
}
