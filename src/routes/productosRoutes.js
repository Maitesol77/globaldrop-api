const express = require('express');
const router = express.Router();
const {
  obtenerTodosLosProductos,
  obtenerProductoPorPartNumber
} = require('../controllers/productosController');

router.get('/', obtenerTodosLosProductos);
router.get('/:partNumber', obtenerProductoPorPartNumber);

module.exports = router;
