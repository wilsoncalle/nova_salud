const Compra = require('../models/compraModel');

const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.getAll();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompraById = async (req, res) => {
  try {
    const compra = await Compra.getById(req.params.id);
    if (!compra) return res.status(404).json({ error: 'No encontrado' });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCompra = async (req, res) => {
  try {
    const id = await Compra.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompra = async (req, res) => {
  try {
    await Compra.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompra = async (req, res) => {
  try {
    await Compra.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
};
