// Logger simple para el proyecto

function logInfo(msg) {
  console.log(`[INFO] ${msg}`);
}

function logError(msg) {
  console.error(`[ERROR] ${msg}`);
}

module.exports = { logInfo, logError };
