const DetalleVenta = require('../models/detalleVentaModel');

const getAllDetalleVentas = async (req, res) => {
  try {
    const detalleVentas = await DetalleVenta.getAll();
    res.json(detalleVentas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetalleVentaById = async (req, res) => {
  try {
    const detalleVenta = await DetalleVenta.getById(req.params.id);
    if (!detalleVenta) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalleVenta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDetalleVenta = async (req, res) => {
  try {
    const id = await DetalleVenta.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDetalleVenta = async (req, res) => {
  try {
    await DetalleVenta.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDetalleVenta = async (req, res) => {
  try {
    await DetalleVenta.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDetalleVentas,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
};
