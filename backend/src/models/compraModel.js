const db = require('../config/database');

const Compra = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT c.*, p.nombre AS proveedor_nombre
      FROM Compras c
      LEFT JOIN Proveedores p ON c.proveedor_id = p.proveedor_id
    `);
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT c.*, p.nombre AS proveedor_nombre
      FROM Compras c
      LEFT JOIN Proveedores p ON c.proveedor_id = p.proveedor_id
      WHERE c.compra_id = ?
    `, [id]);
    return rows[0];
  },
  create: async (data) => {
    const { proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado } = data;
    const [result] = await db.query(
      'INSERT INTO Compras (proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado || 'Pendiente']
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado } = data;
    await db.query(
      'UPDATE Compras SET proveedor_id=?, empleado_id=?, fecha_compra=?, numero_factura=?, subtotal=?, igv=?, total=?, estado=? WHERE compra_id=?',
      [proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado, id]
    );
  },
  delete: async (id) => {
    await db.query('DELETE FROM Compras WHERE compra_id = ?', [id]);
  },
};

module.exports = Compra;
