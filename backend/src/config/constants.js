// Constantes globales para Nova Salud

const ROLES = {
  ADMIN: 'Administrador',
  FARMACEUTICO: 'Farmacéutico',
  VENDEDOR: 'Vendedor',
};

const ESTADOS_PRODUCTO = {
  ACTIVO: 'Activo',
  DESCONTINUADO: 'Descontinuado',
  AGOTADO: 'Agotado',
};

const ESTADOS_EMPLEADO = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};

const ESTADOS_PROVEEDOR = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};

const ESTADOS_VENTA = {
  COMPLETADA: 'Completada',
  ANULADA: 'Anulada',
};

const ESTADOS_COMPRA = {
  PENDIENTE: 'Pendiente',
  RECIBIDA: 'Recibida',
  CANCELADA: 'Cancelada',
};

const TIPOS_ALERTA = {
  STOCK_BAJO: 'Stock Bajo',
  PROXIMO_VENCER: 'Próximo a Vencer',
  SIN_STOCK: 'Sin Stock',
};

const ESTADOS_ALERTA = {
  ACTIVA: 'Activa',
  RESUELTA: 'Resuelta',
};

const TIPOS_DOCUMENTO = {
  DNI: 'DNI',
  RUC: 'RUC',
  CE: 'CE',
  PASAPORTE: 'Pasaporte',
};

const TIPOS_COMPROBANTE = {
  BOLETA: 'Boleta',
  FACTURA: 'Factura',
  TICKET: 'Ticket',
};

const METODOS_PAGO = {
  EFECTIVO: 'Efectivo',
  TARJETA: 'Tarjeta',
  TRANSFERENCIA: 'Transferencia',
};

module.exports = {
  ROLES,
  ESTADOS_PRODUCTO,
  ESTADOS_EMPLEADO,
  ESTADOS_PROVEEDOR,
  ESTADOS_VENTA,
  ESTADOS_COMPRA,
  TIPOS_ALERTA,
  ESTADOS_ALERTA,
  TIPOS_DOCUMENTO,
  TIPOS_COMPROBANTE,
  METODOS_PAGO,
};
