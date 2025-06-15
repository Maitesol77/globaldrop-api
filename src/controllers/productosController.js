
// controllers/productosController.js
const {
  getAllProductos,
  getTotalProductos,
  getProductoByPartNumber
} = require('../models/productosModel');
const sendResponse = require('../helpers/respuestaestandard').sendResponse;

const obtenerTodosLosProductos = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  getAllProductos(limit, offset, (err, productos) => {
    if (err) {
      return sendResponse(res, {
        status: 'error',
        code: 500,
        message: 'Error al obtener los productos',
        data: []
      });
    }

    getTotalProductos((err, total) => {
      if (err) {
        return sendResponse(res, {
          status: 'error',
          code: 500,
          message: 'Error al obtener el total de productos',
          data: []
        });
      }

      sendResponse(res, {
        code: 200,
        message: 'Productos obtenidos correctamente',
        data: productos,
        metadata: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    });
  });
};

const obtenerProductoPorPartNumber = (req, res) => {
  const partNumber = req.params.partNumber;

  getProductoByPartNumber(partNumber, (err, results) => {
    if (err) {
      return sendResponse(res, {
        status: 'error',
        code: 500,
        message: 'Error al buscar el producto',
        data: []
      });
    }

    if (results.length === 0) {
      return sendResponse(res, {
        status: 'error',
        code: 404,
        message: 'Producto no encontrado',
        data: []
      });
    }

    sendResponse(res, {
      code: 200,
      message: 'Producto(s) encontrados con coincidencia parcial',
      data: results
    });
  });
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorPartNumber
};

