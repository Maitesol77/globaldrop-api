const express = require('express');
const router = express.Router();

const {
  obtenerTodosLosProductos,
  obtenerProductoPorPartNumber,
  buscarProductoConFiltros
} = require('../controllers/productosController');

router.get('/', obtenerTodosLosProductos);
router.get('/buscar', buscarProductoConFiltros);
router.get('/:partNumber', obtenerProductoPorPartNumber);

module.exports = router;