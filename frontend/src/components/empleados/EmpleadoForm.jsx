import React, { useState, useEffect } from 'react';
import './EmpleadosStyles.css';

export default function EmpleadoForm({ empleado = null, onSubmit, onCancel = () => {}, readOnly = false }) {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    rol: '',
    usuario: '',
    password_hash: '',
    estado: 'Activo'
  });

  useEffect(() => {
    if (empleado) {
      setFormData({
        dni: empleado.dni || '',
        nombres: empleado.nombres || '',
        apellidos: empleado.apellidos || '',
        rol: empleado.rol || '',
        usuario: empleado.usuario || '',
        password_hash: empleado.password_hash || '',
        estado: empleado.estado || 'Activo'
      });
    }
  }, [empleado]);

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
    <form className="empleado-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
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
      </div>
      <div className="form-row">
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
        <div className="form-group">
          <label>Rol</label>
          <input
            type="text"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            required={!empleado}
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
            {empleado ? 'Actualizar' : 'Crear'} Empleado
          </button>
        )}
        <button type="button" className="btn-cancel" onClick={onCancel}>
          {readOnly ? 'Cerrar' : 'Cancelar'}
        </button>
      </div>
    </form>
  );
}
