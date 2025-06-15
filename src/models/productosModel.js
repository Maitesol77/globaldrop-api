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

// Nueva función: Búsqueda con múltiples filtros
const buscarProducto = ({ marca, categoria, subcategoria, limit, offset }, callback) => {
  let query = 'SELECT * FROM productos WHERE 1=1';
  const params = [];

  if (marca) {
    query += ' AND marca LIKE ?';
    params.push(`%${marca}%`);
  }

  if (categoria) {
    query += ' AND categoria LIKE ?';
    params.push(`%${categoria}%`);
  }

  if (subcategoria) {
    query += ' AND subcategoria LIKE ?';
    params.push(`%${subcategoria}%`);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.query(query, params, callback);
};

const contarProductosConFiltros = ({ marca, categoria, subcategoria }, callback) => {
  let query = 'SELECT COUNT(*) AS total FROM productos WHERE 1=1';
  const params = [];

  if (marca) {
    query += ' AND marca LIKE ?';
    params.push(`%${marca}%`);
  }

  if (categoria) {
    query += ' AND categoria LIKE ?';
    params.push(`%${categoria}%`);
  }

  if (subcategoria) {
    query += ' AND subcategoria LIKE ?';
    params.push(`%${subcategoria}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].total);
  });
};




module.exports = {
  getAllProductos,
  getTotalProductos,
  getProductoByPartNumber,
  buscarProducto,
  contarProductosConFiltros
};

