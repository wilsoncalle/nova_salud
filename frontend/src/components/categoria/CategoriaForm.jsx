import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import './CategoriaStyles.css';

const CategoriaForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || ''
      });
    } else {
      setFormData({ nombre: '', descripcion: '' });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="categoria-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
      <div className="form-grid">
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

export default CategoriaForm;
