require('dotenv').config();

const SERVER_CONFIG = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  // Puedes agregar más configuraciones globales aquí
};

module.exports = SERVER_CONFIG;
