const db = require('../config/database');

const AlertaStock = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM AlertasStock');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM AlertasStock WHERE alerta_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { producto_id, tipo_alerta, mensaje, estado, fecha_generacion } = data;
    const [result] = await db.query(
      'INSERT INTO AlertasStock (producto_id, tipo_alerta, mensaje, estado, fecha_generacion) VALUES (?, ?, ?, ?, ?)',
      [producto_id, tipo_alerta, mensaje, estado || 'Activa', fecha_generacion]
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { producto_id, tipo_alerta, mensaje, estado, fecha_generacion } = data;
    await db.query(
      'UPDATE AlertasStock SET producto_id=?, tipo_alerta=?, mensaje=?, estado=?, fecha_generacion=? WHERE alerta_id=?',
      [producto_id, tipo_alerta, mensaje, estado, fecha_generacion, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM AlertasStock WHERE alerta_id = ?', [id]);
  },
};

module.exports = AlertaStock;
