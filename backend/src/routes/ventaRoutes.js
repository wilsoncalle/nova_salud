const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/', ventaController.getAllVentas);
router.get('/:id', ventaController.getVentaById);
router.post('/', ventaController.createVenta);
router.put('/:id', ventaController.updateVenta);
router.delete('/:id', ventaController.deleteVenta);

module.exports = router;
