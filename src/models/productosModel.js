const db = require('../config/db');

const getAllProductos = callback => {
  db.query('SELECT * FROM productos', callback);
};

const getProductoByPartNumber = (partNumber, callback) => {
  db.query('SELECT * FROM productos WHERE part_number = ?', [partNumber], callback);
};

module.exports = { getAllProductos, getProductoByPartNumber };