const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Ventas por rango de fechas
router.get('/ventas-por-fecha', reporteController.getVentasPorFecha);

// Compras por proveedor
router.get('/compras-por-proveedor', reporteController.getComprasPorProveedor);

// Productos con bajo stock
router.get('/productos-bajo-stock', reporteController.getProductosBajoStock);

module.exports = router;
