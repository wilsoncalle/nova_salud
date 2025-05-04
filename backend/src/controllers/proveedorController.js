const Proveedor = require('../models/proveedorModel');

const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.getAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.getById(req.params.id);
    if (!proveedor) return res.status(404).json({ error: 'No encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProveedor = async (req, res) => {
  try {
    const id = await Proveedor.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProveedor = async (req, res) => {
  try {
    await Proveedor.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProveedor = async (req, res) => {
  try {
    await Proveedor.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
