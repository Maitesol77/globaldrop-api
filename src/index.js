const express = require('express');
const app = express();
require('dotenv').config();
const productosRoutes = require('./routes/productosRoutes');

app.use(express.json());
app.use('/api', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});