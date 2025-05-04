const Empleado = require('../models/empleadoModel');

const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.getAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.getById(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'No encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEmpleado = async (req, res) => {
  try {
    const id = await Empleado.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmpleado = async (req, res) => {
  try {
    await Empleado.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    await Empleado.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
