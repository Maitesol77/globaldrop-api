// controllers/productosController.js
const {
  getAllProductos,
  getTotalProductos,
  getProductoByPartNumber,
  buscarProducto,
  contarProductosConFiltros
} = require('../models/productosModel');

const sendResponse = require('../helpers/respuestaestandard').sendResponse;

// Listar productos con paginación simple
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

// Búsqueda por coincidencia parcial de part_number exacto (parámetro en ruta)
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

// Nueva: búsqueda combinada por filtros en query string
const buscarProductoConFiltros = (req, res) => {
  const allowedParams = ['marca', 'categoria', 'subcategoria', 'limit', 'page'];
  const invalidParams = Object.keys(req.query).filter(param => !allowedParams.includes(param));

  if (invalidParams.length > 0) {
    return sendResponse(res, {
      status: 'error',
      code: 400,
      message: `Búsqueda incorrecta: los únicos parámetros permitidos son ${allowedParams.join(', ')}.`,
      data: []
    });
  }

  const {
    marca,
    categoria,
    subcategoria,
    limit = 10,
    page = 1
  } = req.query;

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = (parsedPage - 1) * parsedLimit;

  const filtros = {
    marca,
    categoria,
    subcategoria,
    limit: parsedLimit,
    offset
  };

  buscarProducto(filtros, (err, productos) => {
    if (err) {
      return sendResponse(res, {
        status: 'error',
        code: 500,
        message: 'Error al buscar productos con filtros',
        data: []
      });
    }

    contarProductosConFiltros(filtros, (err, total) => {
      if (err) {
        return sendResponse(res, {
          status: 'error',
          code: 500,
          message: 'Error al contar productos filtrados',
          data: []
        });
      }

      sendResponse(res, {
  code: 200,
  message: productos.length === 0
    ? 'No se encontraron productos con los filtros aplicados.'
    : 'Productos filtrados correctamente',
  data: productos,
  metadata: {
    total,
    page: parsedPage,
    limit: parsedLimit,
    totalPages: Math.ceil(total / parsedLimit)
  }
});

    });
  });
};



module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorPartNumber,
  buscarProductoConFiltros
};
