const db = require('../config/database');

const Empleado = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Empleados');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Empleados WHERE empleado_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { dni, nombres, apellidos, rol, usuario, password_hash, estado } = data;
    const [result] = await db.query(
      'INSERT INTO Empleados (dni, nombres, apellidos, rol, usuario, password_hash, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [dni, nombres, apellidos, rol, usuario, password_hash, estado || 'Activo']
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { dni, nombres, apellidos, rol, usuario, password_hash, estado } = data;
    await db.query(
      'UPDATE Empleados SET dni=?, nombres=?, apellidos=?, rol=?, usuario=?, password_hash=?, estado=? WHERE empleado_id=?',
      [dni, nombres, apellidos, rol, usuario, password_hash, estado, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM Empleados WHERE empleado_id = ?', [id]);
  },
};

module.exports = Empleado;
