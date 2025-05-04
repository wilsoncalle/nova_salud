const db = require('../config/database');

const Cliente = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Clientes');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Clientes WHERE cliente_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { tipo_documento, num_documento, nombres, apellidos, telefono, email, direccion } = data;
    const [result] = await db.query(
      'INSERT INTO Clientes (tipo_documento, num_documento, nombres, apellidos, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tipo_documento || 'DNI', num_documento, nombres, apellidos, telefono, email, direccion]
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { tipo_documento, num_documento, nombres, apellidos, telefono, email, direccion } = data;
    await db.query(
      'UPDATE Clientes SET tipo_documento=?, num_documento=?, nombres=?, apellidos=?, telefono=?, email=?, direccion=? WHERE cliente_id=?',
      [tipo_documento, num_documento, nombres, apellidos, telefono, email, direccion, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM Clientes WHERE cliente_id = ?', [id]);
  },
};

module.exports = Cliente;
