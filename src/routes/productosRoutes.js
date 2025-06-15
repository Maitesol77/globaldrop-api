const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/productos', productosController.getProductos);
router.get('/productos/:part_number', productosController.getProducto);

module.exports = router;