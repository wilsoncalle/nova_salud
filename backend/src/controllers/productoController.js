const Producto = require('../models/productoModel');

const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.json(productos);
  } catch (error) {
    console.error('Error en getAllProductos:', error);
    res.status(500).json({ error: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.getById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    console.error('Error en getProductoById:', error);
    res.status(500).json({ error: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    // Log de datos recibidos
    console.log('Datos recibidos en createProducto:', JSON.stringify(req.body, null, 2));
    
    
    // Validación de datos requeridos
    const camposRequeridos = [
      'codigo', 
      'nombre', 
      'precio_compra', 
      'precio_venta', 
      'categoria_id', 
      'proveedor_id'
    ];
    
    const camposFaltantes = camposRequeridos.filter(campo => {
      const valor = req.body[campo];
      console.log(`Validando campo ${campo}:`, valor);
      return valor === undefined || valor === null || valor === '';
    });
    
    if (camposFaltantes.length > 0) {
      console.log('Campos faltantes:', camposFaltantes);
      return res.status(400).json({ 
        error: `Faltan campos requeridos: ${camposFaltantes.join(', ')}`,
        camposFaltantes
      });
    }

    // Validación de tipos de datos
    const validaciones = {
      precio_compra: parseFloat(req.body.precio_compra),
      precio_venta: parseFloat(req.body.precio_venta),
      stock_actual: parseInt(req.body.stock_actual || 0),
      stock_minimo: parseInt(req.body.stock_minimo || 5),
      categoria_id: parseInt(req.body.categoria_id),
      proveedor_id: parseInt(req.body.proveedor_id)
    };

    console.log('Datos validados:', validaciones);

    // Preparar datos para inserción
    const productoData = {
      ...req.body,
      precio_compra: validaciones.precio_compra,
      precio_venta: validaciones.precio_venta,
      stock_actual: validaciones.stock_actual,
      stock_minimo: validaciones.stock_minimo,
      categoria_id: validaciones.categoria_id,
      proveedor_id: validaciones.proveedor_id
    };

    console.log('Intentando crear producto con datos:', JSON.stringify(productoData, null, 2));

    // Crear producto
    const productoId = await Producto.create(productoData);
    console.log('Producto creado con ID:', productoId);

    // Obtener el producto creado
    const nuevoProducto = await Producto.getById(productoId);
    console.log('Datos del nuevo producto:', JSON.stringify(nuevoProducto, null, 2));

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error detallado en createProducto:', {
      mensaje: error.message,
      sql: error.sql,
      sqlMessage: error.sqlMessage,
      code: error.code,
      stack: error.stack
    });

    // Determinar el tipo de error para enviar una respuesta apropiada
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'Ya existe un producto con este código',
        detalles: error.sqlMessage
      });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW') {
      return res.status(400).json({
        error: 'La categoría o proveedor especificado no existe',
        detalles: error.sqlMessage
      });
    }

    res.status(500).json({ 
      error: 'Error al crear el producto',
      detalles: error.sqlMessage || error.message
    });
  }
};

const updateProducto = async (req, res) => {
  try {
    // Log de datos recibidos
    console.log('Datos recibidos en updateProducto:', JSON.stringify(req.body, null, 2));
    
    // Validación de datos numéricos si están presentes
    const datosValidados = { ...req.body };
    
    if (req.body.precio_compra !== undefined) {
      datosValidados.precio_compra = parseFloat(req.body.precio_compra);
    }
    if (req.body.precio_venta !== undefined) {
      datosValidados.precio_venta = parseFloat(req.body.precio_venta);
    }
    if (req.body.stock_actual !== undefined) {
      datosValidados.stock_actual = parseInt(req.body.stock_actual);
    }
    if (req.body.stock_minimo !== undefined) {
      datosValidados.stock_minimo = parseInt(req.body.stock_minimo);
    }
    if (req.body.categoria_id !== undefined) {
      datosValidados.categoria_id = parseInt(req.body.categoria_id);
    }
    if (req.body.proveedor_id !== undefined) {
      datosValidados.proveedor_id = parseInt(req.body.proveedor_id);
    }

    console.log('Intentando actualizar producto con datos:', JSON.stringify(datosValidados, null, 2));

    // Actualizar producto
    await Producto.update(req.params.id, datosValidados);
    
    // Obtener el producto actualizado
    const productoActualizado = await Producto.getById(req.params.id);
    console.log('Datos del producto actualizado:', JSON.stringify(productoActualizado, null, 2));
    
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error detallado en updateProducto:', {
      mensaje: error.message,
      sql: error.sql,
      sqlMessage: error.sqlMessage,
      code: error.code,
      stack: error.stack
    });

    // Determinar el tipo de error para enviar una respuesta apropiada
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'Ya existe un producto con este código',
        detalles: error.sqlMessage
      });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW') {
      return res.status(400).json({
        error: 'La categoría o proveedor especificado no existe',
        detalles: error.sqlMessage
      });
    }

    res.status(500).json({ 
      error: 'Error al actualizar el producto',
      detalles: error.sqlMessage || error.message
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    await Producto.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
