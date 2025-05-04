const db = require('../config/database');

const Venta = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT v.*, 
          c.nombres as cliente_nombres, 
          c.apellidos as cliente_apellidos,
          e.nombres as empleado_nombres,
          e.apellidos as empleado_apellidos
        FROM Ventas v
        LEFT JOIN Clientes c ON v.cliente_id = c.cliente_id
        LEFT JOIN Empleados e ON v.empleado_id = e.empleado_id
        ORDER BY v.fecha_venta DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [venta] = await db.query(`
        SELECT v.*, 
          c.nombres as cliente_nombres, 
          c.apellidos as cliente_apellidos,
          e.nombres as empleado_nombres,
          e.apellidos as empleado_apellidos
        FROM Ventas v
        LEFT JOIN Clientes c ON v.cliente_id = c.cliente_id
        LEFT JOIN Empleados e ON v.empleado_id = e.empleado_id
        WHERE v.venta_id = ?
      `, [id]);

      if (!venta[0]) return null;

      const [detalles] = await db.query(`
        SELECT dv.*, p.nombre as producto_nombre, p.codigo as producto_codigo
        FROM DetalleVentas dv
        JOIN Productos p ON dv.producto_id = p.producto_id
        WHERE dv.venta_id = ?
      `, [id]);

      return {
        ...venta[0],
        detalles
      };
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },

  create: async (data) => {
    const connection = await db.getConnection();
    
    try {
      const {
        cliente_id,
        empleado_id,
        tipo_comprobante,
        num_comprobante,
        fecha_venta,
        subtotal,
        igv,
        total,
        metodo_pago,
        detalles
      } = data;

      // Iniciar transacción
      await connection.beginTransaction();

      // Verificar stock disponible antes de proceder
      for (const detalle of detalles) {
        const [stockResult] = await connection.query(
          'SELECT producto_id, nombre, stock_actual FROM Productos WHERE producto_id = ? FOR UPDATE',
          [detalle.producto_id]
        );

        if (!stockResult[0]) {
          throw new Error(`Producto con ID ${detalle.producto_id} no encontrado`);
        }
        
        // Validación estricta: impedir ventas que excedan el stock disponible
        if (stockResult[0].stock_actual < detalle.cantidad) {
          const nombreProducto = stockResult[0].nombre || `Producto ${detalle.producto_id}`;
          throw new Error(`Stock insuficiente para "${nombreProducto}". Se solicitaron ${detalle.cantidad} unidades, pero solo hay ${stockResult[0].stock_actual} disponibles.`);
        }

        // Log de la validación exitosa
        console.log(`Validación de stock exitosa para producto ID ${detalle.producto_id}: ${stockResult[0].stock_actual} disponibles, ${detalle.cantidad} solicitadas`);
      }

      // Crear la venta
      const [result] = await connection.query(
        `INSERT INTO Ventas (
          cliente_id, empleado_id, tipo_comprobante, num_comprobante,
          fecha_venta, subtotal, igv, total, metodo_pago
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cliente_id || null,
          empleado_id,
          tipo_comprobante,
          num_comprobante,
          fecha_venta,
          subtotal,
          igv,
          total,
          metodo_pago
        ]
      );

      const ventaId = result.insertId;

      // Crear detalles de venta y actualizar stock
      for (const detalle of detalles) {
        // Insertar detalle
        await connection.query(
          `INSERT INTO DetalleVentas (
            venta_id, producto_id, cantidad, precio_unitario, subtotal
          ) VALUES (?, ?, ?, ?, ?)`,
          [
            ventaId,
            detalle.producto_id,
            detalle.cantidad,
            detalle.precio_unitario,
            detalle.subtotal
          ]
        );

        // Log antes de actualizar stock
        const [stockBefore] = await connection.query(
          'SELECT stock_actual FROM Productos WHERE producto_id = ?',
          [detalle.producto_id]
        );
        console.log(`DEBUG - Antes de actualizar: Producto ID ${detalle.producto_id}, Stock actual: ${stockBefore[0].stock_actual}, Cantidad a restar: ${detalle.cantidad}`);

        // Actualizar stock
        await connection.query(
          `UPDATE Productos 
           SET stock_actual = stock_actual - ? 
           WHERE producto_id = ?`,
          [detalle.cantidad, detalle.producto_id]
        );

        // Log después de actualizar stock
        const [stockAfter] = await connection.query(
          'SELECT stock_actual FROM Productos WHERE producto_id = ?',
          [detalle.producto_id]
        );
        console.log(`DEBUG - Después de actualizar: Producto ID ${detalle.producto_id}, Stock nuevo: ${stockAfter[0].stock_actual}, Diferencia: ${stockBefore[0].stock_actual - stockAfter[0].stock_actual}`);
        
        // Verificar si hay discrepancia
        if ((stockBefore[0].stock_actual - stockAfter[0].stock_actual) !== detalle.cantidad) {
          console.error(`¡ALERTA! Discrepancia detectada: Se restó ${stockBefore[0].stock_actual - stockAfter[0].stock_actual} unidades en lugar de ${detalle.cantidad} unidades`);
        }
      }

      // Commit de la transacción
      await connection.commit();
      return ventaId;

    } catch (error) {
      // Rollback en caso de error
      await connection.rollback();
      console.error('Error en create:', error);
      throw error;
    } finally {
      // Liberar la conexión
      connection.release();
    }
  },

  update: async (id, data) => {
    try {
      const {
        cliente_id,
        empleado_id,
        tipo_comprobante,
        num_comprobante,
        fecha_venta,
        subtotal,
        igv,
        total,
        metodo_pago,
        estado
      } = data;

      await db.query(
        `UPDATE Ventas SET 
          cliente_id = ?,
          empleado_id = ?,
          tipo_comprobante = ?,
          num_comprobante = ?,
          fecha_venta = ?,
          subtotal = ?,
          igv = ?,
          total = ?,
          metodo_pago = ?,
          estado = ?
        WHERE venta_id = ?`,
        [
          cliente_id || null,
          empleado_id,
          tipo_comprobante,
          num_comprobante,
          fecha_venta,
          subtotal,
          igv,
          total,
          metodo_pago,
          estado || 'Completada',
          id
        ]
      );
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      // Obtener los detalles de la venta
      const [detalles] = await connection.query(
        'SELECT producto_id, cantidad FROM DetalleVentas WHERE venta_id = ?',
        [id]
      );

      // Restaurar el stock de los productos
      for (const detalle of detalles) {
        await connection.query(
          `UPDATE Productos 
           SET stock_actual = stock_actual + ? 
           WHERE producto_id = ?`,
          [detalle.cantidad, detalle.producto_id]
        );
      }

      // Eliminar los detalles de la venta
      await connection.query('DELETE FROM DetalleVentas WHERE venta_id = ?', [id]);

      // Eliminar la venta
      await connection.query('DELETE FROM Ventas WHERE venta_id = ?', [id]);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error('Error en delete:', error);
      throw error;
    } finally {
      connection.release();
    }
  },

  getByDateRange: async (startDate, endDate) => {
    try {
      const [rows] = await db.query(`
        SELECT v.*, 
          c.nombres as cliente_nombres, 
          c.apellidos as cliente_apellidos,
          e.nombres as empleado_nombres,
          e.apellidos as empleado_apellidos
        FROM Ventas v
        LEFT JOIN Clientes c ON v.cliente_id = c.cliente_id
        LEFT JOIN Empleados e ON v.empleado_id = e.empleado_id
        WHERE v.fecha_venta BETWEEN ? AND ?
        ORDER BY v.fecha_venta DESC
      `, [startDate, endDate]);
      return rows;
    } catch (error) {
      console.error('Error en getByDateRange:', error);
      throw error;
    }
  }
};

module.exports = Venta;
