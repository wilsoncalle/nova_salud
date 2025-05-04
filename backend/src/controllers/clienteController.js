const Cliente = require('../models/clienteModel');

const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.getById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'No encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const id = await Cliente.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    await Cliente.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    await Cliente.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
