const db = require('../config/database');

const Producto = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre
        FROM Productos p
        LEFT JOIN Categorias c ON p.categoria_id = c.categoria_id
        LEFT JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre
        FROM Productos p
        LEFT JOIN Categorias c ON p.categoria_id = c.categoria_id
        LEFT JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
        WHERE p.producto_id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      console.log('Iniciando creación de producto con datos:', JSON.stringify(data, null, 2));
      
      // Extraer y validar datos
      const {
        codigo,
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        requiere_receta,
        precio_compra,
        precio_venta,
        stock_actual,
        stock_minimo,
        fecha_vencimiento,
        estado
      } = data;

      // Validaciones básicas
      if (!codigo || !nombre) {
        throw new Error('El código y nombre son obligatorios');
      }

      if (!precio_compra || !precio_venta) {
        throw new Error('Los precios de compra y venta son obligatorios');
      }

      // Validar existencia de categoría si se proporciona
      if (categoria_id) {
        const [categorias] = await db.query('SELECT categoria_id FROM Categorias WHERE categoria_id = ?', [categoria_id]);
        if (categorias.length === 0) {
          throw new Error(`La categoría con ID ${categoria_id} no existe`);
        }
      }

      // Validar existencia de proveedor si se proporciona
      if (proveedor_id) {
        const [proveedores] = await db.query('SELECT proveedor_id FROM Proveedores WHERE proveedor_id = ?', [proveedor_id]);
        if (proveedores.length === 0) {
          throw new Error(`El proveedor con ID ${proveedor_id} no existe`);
        }
      }

      // Preparar valores con tipos de datos correctos
      const values = [
        codigo.toString(),                    // varchar(20)
        nombre.toString(),                    // varchar(100)
        descripcion || null,                  // text, permite null
        categoria_id || null,                 // int(11), permite null
        proveedor_id || null,                 // int(11), permite null
        requiere_receta ? 1 : 0,             // tinyint(1)
        Number(precio_compra),                // decimal(10,2)
        Number(precio_venta),                 // decimal(10,2)
        Number(stock_actual || 0),            // int(11)
        Number(stock_minimo || 5),            // int(11)
        fecha_vencimiento || null,            // date, permite null
        estado || 'Activo'                    // enum
      ];

      // Preparar la consulta
      const query = `
        INSERT INTO Productos (
          codigo,
          nombre,
          descripcion,
          categoria_id,
          proveedor_id,
          requiere_receta,
          precio_compra,
          precio_venta,
          stock_actual,
          stock_minimo,
          fecha_vencimiento,
          estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      console.log('Ejecutando consulta:', {
        query,
        values: JSON.stringify(values, null, 2)
      });

      const [result] = await db.query(query, values);
      console.log('Resultado de la inserción:', result);
      
      return result.insertId;
    } catch (error) {
      console.error('Error en create:', {
        mensaje: error.message,
        sql: error.sql,
        sqlMessage: error.sqlMessage,
        code: error.code,
        stack: error.stack
      });
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const {
        codigo,
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        requiere_receta,
        precio_compra,
        precio_venta,
        stock_actual,
        stock_minimo,
        fecha_vencimiento,
        estado
      } = data;

      const values = [
        codigo.toString(),                    // varchar(20)
        nombre.toString(),                    // varchar(100)
        descripcion || null,                  // text
        categoria_id || null,                 // int(11)
        proveedor_id || null,                 // int(11)
        requiere_receta ? 1 : 0,             // tinyint(1)
        Number(precio_compra),                // decimal(10,2)
        Number(precio_venta),                 // decimal(10,2)
        Number(stock_actual || 0),            // int(11)
        Number(stock_minimo || 5),            // int(11)
        fecha_vencimiento || null,            // date
        estado || 'Activo',                   // enum
        id
      ];

      await db.query(
        `UPDATE Productos SET 
          codigo = ?,
          nombre = ?,
          descripcion = ?,
          categoria_id = ?,
          proveedor_id = ?,
          requiere_receta = ?,
          precio_compra = ?,
          precio_venta = ?,
          stock_actual = ?,
          stock_minimo = ?,
          fecha_vencimiento = ?,
          estado = ?
        WHERE producto_id = ?`,
        values
      );
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.query('DELETE FROM Productos WHERE producto_id = ?', [id]);
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  }
};

module.exports = Producto;
