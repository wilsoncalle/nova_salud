
-- Base de Datos Simplificada para Botica "nova_salud"

-- Sistema de Gestión de Inventario y Ventas



-- Tabla de Categorías de Productos

CREATE TABLE Categorias (

  categoria_id INT PRIMARY KEY AUTO_INCREMENT,

  nombre VARCHAR(50) NOT NULL,

  descripcion TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Tabla de Proveedores

CREATE TABLE Proveedores (

  proveedor_id INT PRIMARY KEY AUTO_INCREMENT,

  nombre VARCHAR(100) NOT NULL,

  ruc VARCHAR(20) NOT NULL,

  telefono VARCHAR(20),

  email VARCHAR(100),

  direccion TEXT,

  contacto_nombre VARCHAR(100),

  estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Tabla de Productos

CREATE TABLE Productos (

  producto_id INT PRIMARY KEY AUTO_INCREMENT,

  codigo VARCHAR(20) UNIQUE NOT NULL,

  nombre VARCHAR(100) NOT NULL,

  descripcion TEXT,

  categoria_id INT,

  proveedor_id INT,

  requiere_receta BOOLEAN DEFAULT FALSE,

  precio_compra DECIMAL(10,2) NOT NULL,

  precio_venta DECIMAL(10,2) NOT NULL,

  stock_actual INT NOT NULL DEFAULT 0,

  stock_minimo INT NOT NULL DEFAULT 5,

  fecha_vencimiento DATE,

  estado ENUM('Activo', 'Descontinuado', 'Agotado') DEFAULT 'Activo',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id),

  FOREIGN KEY (proveedor_id) REFERENCES Proveedores(proveedor_id)

);



-- Tabla de Clientes

CREATE TABLE Clientes (

  cliente_id INT PRIMARY KEY AUTO_INCREMENT,

  tipo_documento ENUM('DNI', 'RUC', 'CE', 'Pasaporte') DEFAULT 'DNI',

  num_documento VARCHAR(20) NOT NULL,

  nombres VARCHAR(100) NOT NULL,

  apellidos VARCHAR(100),

  telefono VARCHAR(20),

  email VARCHAR(100),

  direccion TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Tabla de Empleados/Usuarios del Sistema

CREATE TABLE Empleados (

  empleado_id INT PRIMARY KEY AUTO_INCREMENT,

  dni VARCHAR(20) NOT NULL UNIQUE,

  nombres VARCHAR(100) NOT NULL,

  apellidos VARCHAR(100) NOT NULL,

  rol ENUM('Administrador', 'Farmacéutico', 'Vendedor') NOT NULL,

  usuario VARCHAR(50) UNIQUE NOT NULL,

  password_hash VARCHAR(255) NOT NULL,

  estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Tabla de Compras (a proveedores)

CREATE TABLE Compras (

  compra_id INT PRIMARY KEY AUTO_INCREMENT,

  proveedor_id INT NOT NULL,

  empleado_id INT NOT NULL,

  fecha_compra DATETIME NOT NULL,

  numero_factura VARCHAR(50) NOT NULL,

  subtotal DECIMAL(10,2) NOT NULL,

  igv DECIMAL(10,2) NOT NULL,

  total DECIMAL(10,2) NOT NULL,

  estado ENUM('Pendiente', 'Recibida', 'Cancelada') DEFAULT 'Pendiente',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (proveedor_id) REFERENCES Proveedores(proveedor_id),

  FOREIGN KEY (empleado_id) REFERENCES Empleados(empleado_id)

);



-- Tabla de Detalles de Compra

CREATE TABLE DetalleCompras (

  detalle_compra_id INT PRIMARY KEY AUTO_INCREMENT,

  compra_id INT NOT NULL,

  producto_id INT NOT NULL,

  cantidad INT NOT NULL,

  precio_unitario DECIMAL(10,2) NOT NULL,

  fecha_vencimiento DATE,

  subtotal DECIMAL(10,2) NOT NULL,

  FOREIGN KEY (compra_id) REFERENCES Compras(compra_id),

  FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)

);



-- Tabla de Ventas

CREATE TABLE Ventas (

  venta_id INT PRIMARY KEY AUTO_INCREMENT,

  cliente_id INT,

  empleado_id INT NOT NULL,

  tipo_comprobante ENUM('Boleta', 'Factura', 'Ticket') NOT NULL,

  num_comprobante VARCHAR(20),

  fecha_venta DATETIME NOT NULL,

  subtotal DECIMAL(10,2) NOT NULL,

  igv DECIMAL(10,2) NOT NULL,

  total DECIMAL(10,2) NOT NULL,

  metodo_pago ENUM('Efectivo', 'Tarjeta', 'Transferencia') DEFAULT 'Efectivo',

  estado ENUM('Completada', 'Anulada') DEFAULT 'Completada',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),

  FOREIGN KEY (empleado_id) REFERENCES Empleados(empleado_id)

);



-- Tabla de Detalles de Venta

CREATE TABLE DetalleVentas (

  detalle_venta_id INT PRIMARY KEY AUTO_INCREMENT,

  venta_id INT NOT NULL,

  producto_id INT NOT NULL,

  cantidad INT NOT NULL,

  precio_unitario DECIMAL(10,2) NOT NULL,

  subtotal DECIMAL(10,2) NOT NULL,

  FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id),

  FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)

);



-- Tabla de Alertas de Stock

CREATE TABLE AlertasStock (

  alerta_id INT PRIMARY KEY AUTO_INCREMENT,

  producto_id INT NOT NULL,

  tipo_alerta ENUM('Stock Bajo', 'Próximo a Vencer', 'Sin Stock') NOT NULL,

  mensaje TEXT NOT NULL,

  estado ENUM('Activa', 'Resuelta') DEFAULT 'Activa',

  fecha_generacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)

);



-- Índices para optimizar consultas frecuentes

CREATE INDEX idx_productos_nombre ON Productos(nombre);

CREATE INDEX idx_productos_codigo ON Productos(codigo);

CREATE INDEX idx_productos_categoria ON Productos(categoria_id);

CREATE INDEX idx_productos_stock ON Productos(stock_actual);

CREATE INDEX idx_clientes_documento ON Clientes(num_documento);

CREATE INDEX idx_ventas_fecha ON Ventas(fecha_venta);