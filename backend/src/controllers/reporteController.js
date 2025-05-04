const db = require('../config/database');

// Reporte: Ventas por rango de fechas
const getVentasPorFecha = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT v.*, c.nombres AS cliente, e.nombres AS empleado
       FROM Ventas v
       LEFT JOIN Clientes c ON v.cliente_id = c.cliente_id
       LEFT JOIN Empleados e ON v.empleado_id = e.empleado_id
       WHERE v.fecha_venta BETWEEN ? AND ?
       ORDER BY v.fecha_venta DESC`,
      [fecha_inicio, fecha_fin]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reporte: Compras por proveedor
const getComprasPorProveedor = async (req, res) => {
  const { proveedor_id } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT c.*, p.nombre AS proveedor
       FROM Compras c
       LEFT JOIN Proveedores p ON c.proveedor_id = p.proveedor_id
       WHERE c.proveedor_id = ?
       ORDER BY c.fecha_compra DESC`,
      [proveedor_id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reporte: Productos con bajo stock
const getProductosBajoStock = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM Productos WHERE stock_actual <= stock_minimo AND estado = 'Activo'`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVentasPorFecha,
  getComprasPorProveedor,
  getProductosBajoStock,
};
