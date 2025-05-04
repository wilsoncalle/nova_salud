// frontend/src/components/cliente/ClienteForm.jsx
import React, { useState, useEffect } from 'react';
import './ClienteStyles.css';

export default function ClienteForm({ cliente = null, onSubmit, onCancel, readOnly = false }) {
  const [formData, setFormData] = useState({
    tipo_documento: 'DNI',
    num_documento: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        tipo_documento: cliente.tipo_documento,
        num_documento: cliente.num_documento,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="cliente-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Tipo de Documento</label>
          <select
            name="tipo_documento"
            value={formData.tipo_documento}
            onChange={handleChange}
            required
            disabled={readOnly}
          >
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
            <option value="CE">Carnet Extranjería</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Número de Documento</label>
          <input
            type="text"
            name="num_documento"
            value={formData.num_documento}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
        
        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
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
            pattern="[0-9]{9}"
            title="Número de 9 dígitos"
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

      <div className="form-group">
        <label>Dirección</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          rows="3"
          disabled={readOnly}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          {readOnly ? 'Cerrar' : 'Cancelar'}
        </button>
        {!readOnly && (
          <button type="submit" className="btn-submit">
            {cliente ? 'Actualizar Cliente' : 'Crear Cliente'}
          </button>
        )}
      </div>
    </form>
  );
}