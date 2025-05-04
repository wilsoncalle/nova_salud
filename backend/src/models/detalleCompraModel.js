const db = require('../config/database');

const DetalleCompra = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM DetalleCompras');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM DetalleCompras WHERE detalle_compra_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal } = data;
    const [result] = await db.query(
      'INSERT INTO DetalleCompras (compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
      [compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal]
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal } = data;
    await db.query(
      'UPDATE DetalleCompras SET compra_id=?, producto_id=?, cantidad=?, precio_unitario=?, fecha_vencimiento=?, subtotal=? WHERE detalle_compra_id=?',
      [compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM DetalleCompras WHERE detalle_compra_id = ?', [id]);
  },
};

module.exports = DetalleCompra;
