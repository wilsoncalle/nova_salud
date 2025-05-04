const db = require('../config/database');

const Proveedor = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Proveedores');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Proveedores WHERE proveedor_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { nombre, ruc, telefono, email, direccion, contacto_nombre, estado } = data;
    const [result] = await db.query(
      'INSERT INTO Proveedores (nombre, ruc, telefono, email, direccion, contacto_nombre, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, ruc, telefono, email, direccion, contacto_nombre, estado || 'Activo']
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { nombre, ruc, telefono, email, direccion, contacto_nombre, estado } = data;
    await db.query(
      'UPDATE Proveedores SET nombre=?, ruc=?, telefono=?, email=?, direccion=?, contacto_nombre=?, estado=? WHERE proveedor_id=?',
      [nombre, ruc, telefono, email, direccion, contacto_nombre, estado, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM Proveedores WHERE proveedor_id = ?', [id]);
  },
};

module.exports = Proveedor;
