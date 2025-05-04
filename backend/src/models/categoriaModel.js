const db = require('../config/database');

const Categoria = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Categorias');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Categorias WHERE categoria_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { nombre, descripcion } = data;
    const [result] = await db.query('INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    return result.insertId;
  },
  update: async (id, data) => {
    const { nombre, descripcion } = data;
    await db.query('UPDATE Categorias SET nombre = ?, descripcion = ? WHERE categoria_id = ?', [nombre, descripcion, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM Categorias WHERE categoria_id = ?', [id]);
  },
};

module.exports = Categoria;
