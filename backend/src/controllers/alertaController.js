const AlertaStock = require('../models/alertaStockModel');

const getAllAlertas = async (req, res) => {
  try {
    const alertas = await AlertaStock.getAll();
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAlertaById = async (req, res) => {
  try {
    const alerta = await AlertaStock.getById(req.params.id);
    if (!alerta) return res.status(404).json({ error: 'No encontrado' });
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAlerta = async (req, res) => {
  try {
    const id = await AlertaStock.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAlerta = async (req, res) => {
  try {
    await AlertaStock.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAlerta = async (req, res) => {
  try {
    await AlertaStock.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAlertas,
  getAlertaById,
  createAlerta,
  updateAlerta,
  deleteAlerta,
};
