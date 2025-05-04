
const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const { errorHandler } = require('./utils/errorHandler');

const db = require('./config/database');



// Import routes


const productoRoutes = require('./routes/productoRoutes');

const categoriaRoutes = require('./routes/categoriaRoutes');

const proveedorRoutes = require('./routes/proveedorRoutes');

const clienteRoutes = require('./routes/clienteRoutes');

const empleadoRoutes = require('./routes/empleadoRoutes');

const ventaRoutes = require('./routes/ventaRoutes');

const compraRoutes = require('./routes/compraRoutes');

const reporteRoutes = require('./routes/reporteRoutes');

const alertaRoutes = require('./routes/alertaRoutes');



const app = express();

const PORT = process.env.PORT || 5000;



// Middlewares

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));



// Routes


app.use('/api/productos', productoRoutes);

app.use('/api/categorias', categoriaRoutes);

app.use('/api/proveedores', proveedorRoutes);

app.use('/api/clientes', clienteRoutes);

app.use('/api/empleados', empleadoRoutes);

app.use('/api/ventas', ventaRoutes);

app.use('/api/compras', compraRoutes);

app.use('/api/reportes', reporteRoutes);

app.use('/api/alertas', alertaRoutes);






// Database connection test

db.getConnection()

 .then(() => console.log('Database connected successfully'))

 .catch(err => console.error('Database connection error:', err));



app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

