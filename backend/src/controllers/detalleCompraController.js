const DetalleCompra = require('../models/detalleCompraModel');

const getAllDetalleCompras = async (req, res) => {
  try {
    const detalleCompras = await DetalleCompra.getAll();
    res.json(detalleCompras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetalleCompraById = async (req, res) => {
  try {
    const detalleCompra = await DetalleCompra.getById(req.params.id);
    if (!detalleCompra) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalleCompra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDetalleCompra = async (req, res) => {
  try {
    const id = await DetalleCompra.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDetalleCompra = async (req, res) => {
  try {
    await DetalleCompra.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDetalleCompra = async (req, res) => {
  try {
    await DetalleCompra.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDetalleCompras,
  getDetalleCompraById,
  createDetalleCompra,
  updateDetalleCompra,
  deleteDetalleCompra,
};
