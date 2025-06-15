const express = require('express');
const app = express();
require('dotenv').config();

// Importar rutas
const productosRoutes = require('./routes/productosRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Rutas montadas correctamente bajo /api/productos
app.use('/api/productos', productosRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api/productos`);
});
