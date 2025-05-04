// Servicio de envío de emails
// Puedes implementar nodemailer o cualquier otro proveedor aquí

const sendEmail = async ({ to, subject, text, html }) => {
  // Implementar integración real aquí
  console.log(`Simulación de envío de email a ${to}: ${subject}`);
  return true;
};

module.exports = { sendEmail };
