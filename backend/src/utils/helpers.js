// Funciones utilitarias generales

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

module.exports = { isEmpty, formatDate };
