const db = require('../config/database');

const DetalleVenta = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM DetalleVentas');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM DetalleVentas WHERE detalle_venta_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { venta_id, producto_id, cantidad, precio_unitario, subtotal } = data;
    const [result] = await db.query(
      'INSERT INTO DetalleVentas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [venta_id, producto_id, cantidad, precio_unitario, subtotal]
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { venta_id, producto_id, cantidad, precio_unitario, subtotal } = data;
    await db.query(
      'UPDATE DetalleVentas SET venta_id=?, producto_id=?, cantidad=?, precio_unitario=?, subtotal=? WHERE detalle_venta_id=?',
      [venta_id, producto_id, cantidad, precio_unitario, subtotal, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM DetalleVentas WHERE detalle_venta_id = ?', [id]);
  },
};

module.exports = DetalleVenta;
