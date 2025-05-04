// Middleware de manejo de errores para Express
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
}

module.exports = { errorHandler };
