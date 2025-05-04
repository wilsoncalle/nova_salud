const Venta = require('../models/ventaModel');

const getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.getAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVentaById = async (req, res) => {
  try {
    const venta = await Venta.getById(req.params.id);
    if (!venta) return res.status(404).json({ error: 'No encontrado' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVenta = async (req, res) => {
  try {
    // Log detallado de la petición para diagnosticar duplicación
    console.log('=== INICIO PETICIÓN VENTA ===');
    console.log(`Fecha y hora: ${new Date().toISOString()}`);
    console.log('Detalles recibidos:', JSON.stringify(req.body.detalles));

    // Verificación de stock ANTES de la venta
    const db = require('../config/database');
    for (const detalle of req.body.detalles) {
      const [stockResult] = await db.query(
        'SELECT producto_id, nombre, stock_actual FROM Productos WHERE producto_id = ?',
        [detalle.producto_id]
      );
      if (stockResult[0]) {
        console.log(`VERIFICACIÓN PRE-VENTA - Producto ID ${detalle.producto_id} (${stockResult[0].nombre}): Stock actual = ${stockResult[0].stock_actual}, Cantidad a vender = ${detalle.cantidad}`);
      }
    }

    // Procesar la venta normalmente
    const id = await Venta.create(req.body);

    // Verificación de stock DESPUÉS de la venta
    for (const detalle of req.body.detalles) {
      const [stockResult] = await db.query(
        'SELECT producto_id, nombre, stock_actual FROM Productos WHERE producto_id = ?',
        [detalle.producto_id]
      );
      if (stockResult[0]) {
        console.log(`VERIFICACIÓN POST-VENTA - Producto ID ${detalle.producto_id} (${stockResult[0].nombre}): Stock nuevo = ${stockResult[0].stock_actual}`);
      }
    }

    console.log('=== FIN PETICIÓN VENTA ===\n');

    res.status(201).json({ id });
  } catch (error) {
    console.error('ERROR EN CREACIÓN DE VENTA:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateVenta = async (req, res) => {
  try {
    await Venta.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVenta = async (req, res) => {
  try {
    await Venta.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta,
};
