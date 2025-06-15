// models/productosModel.js
const db = require('../config/db');

// Listar productos con paginación
const getAllProductos = (limit, offset, callback) => {
  let query = 'SELECT * FROM productos';
  const params = [];

  if (limit !== undefined && offset !== undefined) {
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
  }

  db.query(query, params, callback);
};

// Obtener total de productos (para metadata)
const getTotalProductos = (callback) => {
  db.query('SELECT COUNT(*) AS total FROM productos', (err, results) => {
    if (err) return callback(err);
    const total = results[0].total;
    callback(null, total);
  });
};

// Búsqueda por coincidencia parcial de part_number
const getProductoByPartNumber = (partNumber, callback) => {
  const query = 'SELECT * FROM productos WHERE part_number LIKE ?';
  const formattedParam = `%${partNumber}%`;
  db.query(query, [formattedParam], callback);
};

module.exports = {
  getAllProductos,
  getTotalProductos,
  getProductoByPartNumber
};
