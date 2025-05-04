const Categoria = require('../models/categoriaModel');

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.getById(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'No encontrado' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const id = await Categoria.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    await Categoria.update(req.params.id, req.body);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    await Categoria.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
