// Funciones de validación comunes

function isEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

module.exports = { isEmail, isNumeric };
