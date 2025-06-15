// controllers/productosController.js
const { getAllProductos, getProductoByPartNumber } = require('../models/productosModel');
const sendResponse = require('../helpers/respuestaestandard').sendResponse;

const obtenerTodosLosProductos = (req, res) => {
  getAllProductos((err, results) => {
    if (err) {
      return sendResponse(res, {
        status: 'error',
        code: 500,
        message: 'Error al obtener los productos',
        data: []
      });
    }

    sendResponse(res, {
      code: 200,
      message: 'Productos obtenidos correctamente',
      data: results,
      metadata: {
        total: results.length
      }
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
      message: 'Producto encontrado',
      data: results
    });
  });
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorPartNumber
};
