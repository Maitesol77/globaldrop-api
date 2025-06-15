const Producto = require('../models/productosModel');

exports.getProductos = (req, res) => {
  Producto.getAllProductos((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getProducto = (req, res) => {
  const { part_number } = req.params;
  Producto.getProductoByPartNumber(part_number, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(results[0]);
  });
};