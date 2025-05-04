-- Seed Data para Base de Datos de Botica "Nova Salud"



-- Insertar Categorías

INSERT INTO Categorias (nombre, descripcion) VALUES

('Analgésicos', 'Medicamentos para aliviar el dolor'),

('Antiinflamatorios', 'Medicamentos para reducir la inflamación'),

('Antibióticos', 'Medicamentos para tratar infecciones bacterianas'),

('Antialérgicos', 'Medicamentos para tratar alergias'),

('Antipiréticos', 'Medicamentos para reducir la fiebre'),

('Antigripales', 'Medicamentos para tratar síntomas de gripe'),

('Vitaminas', 'Suplementos vitamínicos'),

('Dermatológicos', 'Productos para el cuidado de la piel'),

('Oftálmicos', 'Medicamentos para los ojos'),

('Gastrointestinales', 'Medicamentos para problemas digestivos'),

('Antihipertensivos', 'Medicamentos para la presión arterial'),

('Antidiabéticos', 'Medicamentos para la diabetes'),

('Respiratorios', 'Medicamentos para problemas respiratorios'),

('Cuidado Personal', 'Productos de higiene y cuidado personal'),

('Bebés y Niños', 'Productos para el cuidado infantil');



-- Insertar Proveedores

INSERT INTO Proveedores (nombre, ruc, telefono, email, direccion, contacto_nombre, estado) VALUES

('Farmadistribuidora S.A.', '20123456789', '01-4567890', 'ventas@farmadistribuidora.com', 'Av. Industrial 123, Lima', 'Carlos Mendoza', 'Activo'),

('Química Suiza', '20543216789', '01-3334455', 'pedidos@quimicasuiza.com', 'Jr. Las Begonias 520, Lima', 'María Rodríguez', 'Activo'),

('Distribuidora Farmacéutica', '20567891234', '01-2223344', 'ventas@distrifarm.com', 'Av. Argentina 4567, Callao', 'Jorge Sánchez', 'Activo'),

('InkaFarma Distribución', '20345678912', '01-5556677', 'distribucion@inkafarma.com.pe', 'Av. La Marina 2040, Lima', 'Ana Gutiérrez', 'Activo'),

('MedicalGroup Perú', '20789123456', '01-6667788', 'contacto@medicalgroup.pe', 'Jr. Huallaga 456, Lima', 'Roberto Díaz', 'Activo'),

('FarmaCorp Distribuciones', '20678912345', '01-7778899', 'ventas@farmacorp.com.pe', 'Av. Javier Prado 890, Lima', 'Lucía Torres', 'Activo'),

('Droguería Los Andes', '20891234567', '01-8889900', 'pedidos@drogueriaandes.com', 'Av. Arequipa 1560, Lima', 'Pedro Vargas', 'Activo'),

('Abbott Laboratorios', '20456789123', '01-9990011', 'ventas@abbott.com.pe', 'Av. República de Panamá 3030, Lima', 'Carmen Flores', 'Activo'),

('Bayer Perú', '20912345678', '01-1112233', 'comercial@bayer.com.pe', 'Av. Paseo de la República 3075, Lima', 'Juan Martínez', 'Activo'),

('Pfizer Distribución', '20234567891', '01-2221133', 'distribucion@pfizer.com.pe', 'Calle Las Orquídeas 585, Lima', 'Patricia López', 'Activo');



-- Insertar Empleados

INSERT INTO Empleados (dni, nombres, apellidos, rol, usuario, password_hash, estado) VALUES

('45678912', 'Miguel', 'Torres Vega', 'Administrador', 'mtorres', '$2a$10$X5Ld3o4AIXjSCEkfmjvQAeM.QC1fqWJfTJa.QQKJLxZ9aUz4ZUVSa', 'Activo'),

('32165498', 'Laura', 'Sánchez Díaz', 'Farmacéutico', 'lsanchez', '$2a$10$RuLJ7kKSgJJCIodVrs5u8eVkBEAXcS5/Cz3X2b8w3IJyXsCtvN0ba', 'Activo'),

('78945612', 'Carlos', 'Mendoza Paredes', 'Vendedor', 'cmendoza', '$2a$10$dUGt7nMd7zQw3XYK5LOE7.3NJ5XgBGVq5Vh.IVpvhZ1fqr1xDKZPq', 'Activo'),

('65498732', 'Ana', 'Flores Ríos', 'Farmacéutico', 'aflores', '$2a$10$kV3qo0xX1mKyKs2h5KJttuJ2G3vUQMR7uUraaYQrCvAIZxiJQ5n6i', 'Activo'),

('14725836', 'Pedro', 'Gutiérrez López', 'Vendedor', 'pgutierrez', '$2a$10$hjKuv3KGIYy3y56m0TyxUeYBQ.GBgH9RqcCzb1LVFm3vy4SGrRQEW', 'Activo'),

('96385274', 'María', 'Rodríguez Castro', 'Administrador', 'mrodriguez', '$2a$10$QHY0Y3WXKv8EwQFs9EvV1eoDNJvMD.U7QGafK3RnSm6KeLDIhXhMu', 'Activo'),

('25836974', 'José', 'Vásquez Morales', 'Vendedor', 'jvasquez', '$2a$10$Gy.NUhfyxAGnJKQUcGlIleGPM2xLLPTRDLGOkKpUYg81p9mFAYJ.e', 'Activo'),

('36974125', 'Carmen', 'Quispe Medina', 'Farmacéutico', 'cquispe', '$2a$10$QWER1PoiuytRElmsKLMN9OpqrStUVwXyz7890abCDefgHIjklMNO1', 'Activo'),

('74125896', 'Roberto', 'Díaz Silva', 'Vendedor', 'rdiaz', '$2a$10$aBcDeF1234GhIjkLmNoPqRsTuVwXyZ7890AbCdEfgHiJkLmNoPq2', 'Activo'),

('58963214', 'Lucía', 'Torres Huamán', 'Vendedor', 'ltorres', '$2a$10$KLmNoBpQrStUvWxYz7890AbCdEfgHiJkLmNoPqRsTuVwXyZ1234a', 'Activo');



-- Insertar Clientes

INSERT INTO Clientes (tipo_documento, num_documento, nombres, apellidos, telefono, email, direccion) VALUES

('DNI', '45678912', 'Juan', 'Pérez Silva', '987654321', 'juanperez@gmail.com', 'Av. Arequipa 1420, Lima'),

('DNI', '32165498', 'María', 'González Torres', '976543210', 'maria.gt@hotmail.com', 'Jr. Huallaga 340, Lima'),

('RUC', '20123456789', 'Supermercados Wong', '', '945678123', 'compras@wong.pe', 'Av. Javier Prado 1250, Lima'),

('DNI', '78945612', 'Pedro', 'Ramírez Suárez', '932145678', 'pedroramirez@gmail.com', 'Av. La Marina 780, Lima'),

('CE', 'CE123456', 'Sophie', 'Martin', '912345678', 'sophie.martin@gmail.com', 'Calle Los Pinos 230, Miraflores'),

('DNI', '14725836', 'Carmen', 'López Ríos', '965432187', 'carmen.lopez@outlook.com', 'Jr. Huáscar 450, Lima'),

('RUC', '20654321987', 'Clínica San Pablo', '', '933221144', 'farmacia@sanpablo.com.pe', 'Av. El Polo 789, Surco'),

('DNI', '25836974', 'Jorge', 'Mendoza Vargas', '945612378', 'jmendoza@gmail.com', 'Calle Los Olivos 567, San Borja'),

('DNI', '36974125', 'Ana', 'Castro Medina', '978563412', 'ana.castro@hotmail.com', 'Jr. Camaná 340, Lima'),

('DNI', '74125896', 'Luis', 'Flores Quispe', '996325874', 'lflores@gmail.com', 'Av. Brasil 2340, Jesús María'),

('DNI', '58963214', 'Raúl', 'Torres Vega', '974563218', 'raultvega@gmail.com', 'Av. La Paz 890, Miraflores'),

('DNI', '32659874', 'Claudia', 'Díaz Paredes', '963258741', 'claudia.diaz@outlook.com', 'Calle Los Jazmines 456, La Molina'),

('RUC', '20789456123', 'Hotel Sheraton', '', '945871236', 'compras@sheraton.com.pe', 'Av. Paseo de la República 170, Lima'),

('DNI', '96325874', 'Ricardo', 'Solís Mendoza', '978456321', 'ricardo.solis@gmail.com', 'Jr. Lampa 420, Lima'),

('DNI', '74185296', 'Verónica', 'Ortiz Flores', '936925814', 'vortiz@hotmail.com', 'Av. Primavera 340, Surco');



-- Insertar Productos

INSERT INTO Productos (codigo, nombre, descripcion, categoria_id, proveedor_id, requiere_receta, precio_compra, precio_venta, stock_actual, stock_minimo, fecha_vencimiento, estado) VALUES

('P001', 'Paracetamol 500mg', 'Analgésico y antipirético en tabletas', 1, 1, FALSE, 0.30, 0.50, 500, 100, '2026-06-30', 'Activo'),

('P002', 'Ibuprofeno 400mg', 'Antiinflamatorio en tabletas', 2, 2, FALSE, 0.40, 0.70, 350, 80, '2026-08-15', 'Activo'),

('P003', 'Amoxicilina 500mg', 'Antibiótico en cápsulas', 3, 3, TRUE, 0.80, 1.50, 200, 50, '2025-12-20', 'Activo'),

('P004', 'Loratadina 10mg', 'Antihistamínico en tabletas', 4, 4, FALSE, 0.60, 1.20, 250, 60, '2026-05-10', 'Activo'),

('P005', 'Diclofenaco 50mg', 'Antiinflamatorio en tabletas', 2, 5, FALSE, 0.35, 0.65, 400, 90, '2026-07-25', 'Activo'),

('P006', 'Omeprazol 20mg', 'Inhibidor de la bomba de protones en cápsulas', 10, 6, FALSE, 0.70, 1.30, 300, 70, '2026-04-15', 'Activo'),

('P007', 'Aspirina 100mg', 'Antiagregante plaquetario en tabletas', 1, 7, FALSE, 0.25, 0.45, 600, 120, '2026-09-30', 'Activo'),

('P008', 'Ciprofloxacino 500mg', 'Antibiótico en tabletas', 3, 8, TRUE, 1.20, 2.40, 150, 40, '2025-11-10', 'Activo'),

('P009', 'Enalapril 10mg', 'Antihipertensivo en tabletas', 11, 9, TRUE, 0.50, 1.00, 200, 50, '2026-03-20', 'Activo'),

('P010', 'Metformina 850mg', 'Antidiabético en tabletas', 12, 10, TRUE, 0.45, 0.90, 250, 60, '2026-02-28', 'Activo'),

('P011', 'Clonazepam 2mg', 'Ansiolítico en tabletas', 1, 1, TRUE, 0.90, 1.80, 100, 30, '2025-10-15', 'Activo'),

('P012', 'Alcohol 70° 250ml', 'Antiséptico en solución', 14, 2, FALSE, 3.50, 6.00, 150, 30, '2027-01-31', 'Activo'),

('P013', 'Salbutamol Inhalador', 'Broncodilatador en aerosol', 13, 3, FALSE, 15.00, 25.00, 50, 10, '2025-09-30', 'Activo'),

('P014', 'Vitamina C 500mg', 'Suplemento vitamínico en tabletas', 7, 4, FALSE, 0.40, 0.80, 300, 70, '2026-11-20', 'Activo'),

('P015', 'Complejo B', 'Suplemento vitamínico en tabletas', 7, 5, FALSE, 0.50, 1.00, 250, 60, '2026-10-15', 'Activo'),

('P016', 'Panadol Antigripal', 'Medicamento para síntomas de gripe', 6, 6, FALSE, 1.20, 2.00, 200, 50, '2026-05-30', 'Activo'),

('P017', 'Ensure Advance Vainilla', 'Suplemento nutricional en polvo 400g', 7, 7, FALSE, 45.00, 65.00, 30, 5, '2026-04-10', 'Activo'),

('P018', 'Pañales Huggies Talla G', 'Pañales para bebés paquete x36', 15, 8, FALSE, 35.00, 50.00, 40, 10, '2027-03-15', 'Activo'),

('P019', 'Crema Cetaphil 250g', 'Crema hidratante para piel sensible', 8, 9, FALSE, 40.00, 60.00, 25, 5, '2026-08-20', 'Activo'),

('P020', 'Gotas Oftálmicas Refresh', 'Lágrimas artificiales 15ml', 9, 10, FALSE, 18.00, 30.00, 35, 8, '2025-12-10', 'Activo'),

('P021', 'Ranitidina 300mg', 'Antiácido en tabletas', 10, 1, FALSE, 0.60, 1.10, 180, 40, '2026-01-15', 'Activo'),

('P022', 'Losartán 50mg', 'Antihipertensivo en tabletas', 11, 2, TRUE, 0.70, 1.40, 160, 40, '2026-03-10', 'Activo'),

('P023', 'Naproxeno 550mg', 'Antiinflamatorio en tabletas', 2, 3, FALSE, 0.50, 1.00, 220, 50, '2026-07-10', 'Activo'),

('P024', 'Cetirizina 10mg', 'Antihistamínico en tabletas', 4, 4, FALSE, 0.55, 1.10, 190, 40, '2026-04-20', 'Activo'),

('P025', 'Azitromicina 500mg', 'Antibiótico en tabletas', 3, 5, TRUE, 2.50, 4.00, 80, 20, '2025-11-30', 'Activo'),

('P026', 'Simvastatina 20mg', 'Hipolipemiante en tabletas', 11, 6, TRUE, 0.90, 1.80, 110, 30, '2026-02-10', 'Activo'),

('P027', 'Hidrocortisona Crema 1%', 'Corticoide tópico 15g', 8, 7, FALSE, 12.00, 20.00, 45, 10, '2026-06-15', 'Activo'),

('P028', 'Ambroxol Jarabe', 'Mucolítico 120ml', 13, 8, FALSE, 9.00, 15.00, 60, 15, '2025-10-20', 'Activo'),

('P029', 'Protect Bloqueador SPF50', 'Protector solar 100ml', 14, 9, FALSE, 25.00, 40.00, 35, 8, '2026-09-10', 'Activo'),

('P030', 'Dexametasona 4mg', 'Corticoide en ampolla', 2, 10, TRUE, 3.50, 6.00, 70, 20, '2025-12-15', 'Activo'),

('P031', 'Multivitamínico Centrum', 'Suplemento vitamínico en tabletas', 7, 1, FALSE, 0.80, 1.50, 120, 30, '2026-08-10', 'Activo'),

('P032', 'Algodón 100g', 'Algodón hidrófilo', 14, 2, FALSE, 4.00, 7.00, 80, 20, '2027-05-30', 'Activo'),

('P033', 'Gasas Estériles 10x10', 'Paquete x 10 unidades', 14, 3, FALSE, 3.50, 6.00, 90, 20, '2027-04-15', 'Activo'),

('P034', 'Esparadrapo Micropore', 'Cinta adhesiva hipoalergénica', 14, 4, FALSE, 8.00, 13.00, 50, 10, '2027-03-20', 'Activo'),

('P035', 'Sulfato Ferroso 300mg', 'Suplemento de hierro en tabletas', 7, 5, FALSE, 0.40, 0.80, 150, 40, '2026-05-25', 'Activo'),

('P036', 'Glibenclamida 5mg', 'Antidiabético en tabletas', 12, 6, TRUE, 0.30, 0.60, 180, 40, '2026-04-10', 'Activo'),

('P037', 'Ácido Fólico 1mg', 'Vitamina B9 en tabletas', 7, 7, FALSE, 0.20, 0.40, 300, 60, '2026-10-10', 'Activo'),

('P038', 'Biotina 10000mcg', 'Vitamina para cabello y uñas', 7, 8, FALSE, 0.90, 1.80, 100, 25, '2026-07-15', 'Activo'),

('P039', 'Ketoprofeno 100mg', 'Antiinflamatorio en tabletas', 2, 9, FALSE, 0.70, 1.40, 130, 30, '2026-06-20', 'Activo'),

('P040', 'Clotrimazol Crema 1%', 'Antimicótico tópico 20g', 8, 10, FALSE, 10.00, 18.00, 40, 10, '2026-03-30', 'Activo'),

('P041', 'Amoxicilina+Ac. Clavulánico', 'Antibiótico en suspensión 100ml', 3, 1, TRUE, 22.00, 38.00, 25, 8, '2025-09-15', 'Activo'),

('P042', 'Dextrometorfano Jarabe', 'Antitusivo 120ml', 13, 2, FALSE, 12.00, 20.00, 35, 10, '2025-11-20', 'Activo'),

('P043', 'Fluconazol 150mg', 'Antimicótico en cápsulas', 3, 3, TRUE, 4.00, 7.00, 60, 15, '2026-01-25', 'Activo'),

('P044', 'Atorvastatina 20mg', 'Hipolipemiante en tabletas', 11, 4, TRUE, 1.00, 2.00, 100, 25, '2026-04-30', 'Activo'),

('P045', 'Clobetasol Crema 0.05%', 'Corticoide tópico potente 15g', 8, 5, FALSE, 15.00, 25.00, 30, 8, '2026-02-28', 'Activo'),

('P046', 'Tinidazol 500mg', 'Antiparasitario en tabletas', 3, 6, TRUE, 1.20, 2.20, 80, 20, '2026-03-15', 'Activo'),

('P047', 'Amlodipino 5mg', 'Antihipertensivo en tabletas', 11, 7, TRUE, 0.60, 1.20, 120, 30, '2026-05-20', 'Activo'),

('P048', 'Ácido Acetilsalicílico 100mg', 'Antiagregante plaquetario', 1, 8, FALSE, 0.15, 0.30, 400, 80, '2026-09-15', 'Activo'),

('P049', 'Cefadroxilo 500mg', 'Antibiótico en cápsulas', 3, 9, TRUE, 1.50, 2.80, 70, 20, '2025-12-30', 'Activo'),

('P050', 'Vick VapoRub 50g', 'Descongestionante tópico', 13, 10, FALSE, 15.00, 24.00, 50, 15, '2026-08-25', 'Activo');



-- Insertar Compras

INSERT INTO Compras (proveedor_id, empleado_id, fecha_compra, numero_factura, subtotal, igv, total, estado) VALUES

(1, 1, '2024-03-10 09:30:00', 'F001-00123', 2500.00, 450.00, 2950.00, 'Recibida'),

(2, 1, '2024-03-12 10:15:00', 'F002-00234', 1800.00, 324.00, 2124.00, 'Recibida'),

(3, 6, '2024-03-15 11:00:00', 'F003-00345', 3200.00, 576.00, 3776.00, 'Recibida'),

(4, 6, '2024-03-18 09:45:00', 'F004-00456', 1500.00, 270.00, 1770.00, 'Recibida'),

(5, 1, '2024-03-20 14:30:00', 'F005-00567', 2800.00, 504.00, 3304.00, 'Recibida'),

(6, 6, '2024-03-25 10:30:00', 'F006-00678', 1900.00, 342.00, 2242.00, 'Recibida'),

(7, 1, '2024-03-28 11:15:00', 'F007-00789', 2200.00, 396.00, 2596.00, 'Recibida'),

(8, 6, '2024-04-01 09:00:00', 'F008-00890', 3500.00, 630.00, 4130.00, 'Recibida'),

(9, 1, '2024-04-05 13:45:00', 'F009-00901', 2000.00, 360.00, 2360.00, 'Recibida'),

(10, 6, '2024-04-10 10:00:00', 'F010-01012', 4000.00, 720.00, 4720.00, 'Recibida'),

(1, 1, '2024-04-15 11:30:00', 'F011-01123', 1800.00, 324.00, 2124.00, 'Recibida'),

(2, 6, '2024-04-18 14:15:00', 'F012-01234', 2500.00, 450.00, 2950.00, 'Recibida');



-- Insertar Detalles de Compra

INSERT INTO DetalleCompras (compra_id, producto_id, cantidad, precio_unitario, fecha_vencimiento, subtotal) VALUES

(1, 1, 500, 0.30, '2026-06-30', 150.00),

(1, 2, 350, 0.40, '2026-08-15', 140.00),

(1, 3, 200, 0.80, '2025-12-20', 160.00),

(2, 4, 250, 0.60, '2026-05-10', 150.00),

(2, 5, 400, 0.35, '2026-07-25', 140.00),

(2, 6, 300, 0.70, '2026-04-15', 210.00),

(3, 7, 600, 0.25, '2026-09-30', 150.00),

(3, 8, 150, 1.20, '2025-11-10', 180.00),

(3, 9, 200, 0.50, '2026-03-20', 100.00),

(4, 10, 250, 0.45, '2026-02-28', 112.50),

(4, 11, 100, 0.90, '2025-10-15', 90.00),

(4, 12, 150, 3.50, '2027-01-31', 525.00),

(5, 13, 50, 15.00, '2025-09-30', 750.00),

(5, 14, 300, 0.40, '2026-11-20', 120.00),

(5, 15, 250, 0.50, '2026-10-15', 125.00),

(6, 16, 200, 1.20, '2026-05-30', 240.00),

(6, 17, 30, 45.00, '2026-04-10', 1350.00),

(6, 18, 40, 35.00, '2027-03-15', 1400.00),

(7, 19, 25, 40.00, '2026-08-20', 1000.00),

(7, 20, 35, 18.00, '2025-12-10', 630.00),

(7, 21, 180, 0.60, '2026-01-15', 108.00),

(8, 22, 160, 0.70, '2026-03-10', 112.00),

(8, 23, 220, 0.50, '2026-07-10', 110.00),

(8, 24, 190, 0.55, '2026-04-20', 104.50),

(9, 25, 80, 2.50, '2025-11-30', 200.00),

(9, 26, 110, 0.90, '2026-02-10', 99.00),

(9, 27, 45, 12.00, '2026-06-15', 540.00),

(10, 28, 60, 9.00, '2025-10-20', 540.00),

(10, 29, 35, 25.00, '2026-09-10', 875.00),

(10, 30, 70, 3.50, '2025-12-15', 245.00),

(11, 31, 120, 0.80, '2026-08-10', 96.00),

(11, 32, 80, 4.00, '2027-05-30', 320.00),

(11, 33, 90, 3.50, '2027-04-15', 315.00),

(12, 34, 50, 8.00, '2027-03-20', 400.00),

(12, 35, 150, 0.40, '2026-05-25', 60.00),

(12, 36, 180, 0.30, '2026-04-10', 54.00);



-- Continuación de la inserción de Ventas

INSERT INTO Ventas (cliente_id, empleado_id, tipo_comprobante, num_comprobante, fecha_venta, subtotal, igv, total, metodo_pago, estado) VALUES

(1, 3, 'Boleta', 'B001-00001', '2024-03-15 08:30:00', 16.95, 3.05, 20.00, 'Efectivo', 'Completada'),

(2, 5, 'Boleta', 'B001-00002', '2024-03-15 09:45:00', 33.90, 6.10, 40.00, 'Tarjeta', 'Completada'),

(3, 7, 'Factura', 'F001-00001', '2024-03-15 10:30:00', 126.27, 22.73, 149.00, 'Transferencia', 'Completada'),

(4, 3, 'Boleta', 'B001-00003', '2024-03-15 11:15:00', 22.03, 3.97, 26.00, 'Efectivo', 'Completada'),

(5, 5, 'Boleta', 'B001-00004', '2024-03-15 12:00:00', 55.08, 9.92, 65.00, 'Tarjeta', 'Completada'),

(6, 7, 'Boleta', 'B001-00005', '2024-03-15 14:30:00', 42.37, 7.63, 50.00, 'Efectivo', 'Completada'),

(7, 3, 'Factura', 'F001-00002', '2024-03-15 15:45:00', 84.75, 15.25, 100.00, 'Transferencia', 'Completada'),

(8, 5, 'Boleta', 'B001-00006', '2024-03-15 16:30:00', 29.66, 5.34, 35.00, 'Efectivo', 'Completada'),

(9, 7, 'Boleta', 'B001-00007', '2024-03-15 17:15:00', 38.14, 6.86, 45.00, 'Tarjeta', 'Completada'),

(10, 3, 'Boleta', 'B001-00008', '2024-03-16 09:00:00', 12.71, 2.29, 15.00, 'Efectivo', 'Completada'),

(11, 5, 'Boleta', 'B001-00009', '2024-03-16 10:15:00', 67.80, 12.20, 80.00, 'Efectivo', 'Completada'),

(12, 7, 'Factura', 'F001-00003', '2024-03-16 11:30:00', 169.49, 30.51, 200.00, 'Transferencia', 'Completada'),

(13, 3, 'Boleta', 'B001-00010', '2024-03-16 12:45:00', 105.93, 19.07, 125.00, 'Tarjeta', 'Completada'),

(14, 5, 'Boleta', 'B001-00011', '2024-03-16 14:00:00', 25.42, 4.58, 30.00, 'Efectivo', 'Completada'),

(15, 7, 'Boleta', 'B001-00012', '2024-03-16 15:15:00', 50.85, 9.15, 60.00, 'Tarjeta', 'Completada'),

(1, 3, 'Boleta', 'B001-00013', '2024-03-16 16:30:00', 33.90, 6.10, 40.00, 'Efectivo', 'Completada'),

(2, 5, 'Boleta', 'B001-00014', '2024-03-16 17:45:00', 18.64, 3.36, 22.00, 'Tarjeta', 'Completada'),

(3, 7, 'Factura', 'F001-00004', '2024-03-17 09:30:00', 211.86, 38.14, 250.00, 'Transferencia', 'Completada'),

(4, 3, 'Boleta', 'B001-00015', '2024-03-17 10:45:00', 76.27, 13.73, 90.00, 'Efectivo', 'Completada'),

(5, 5, 'Boleta', 'B001-00016', '2024-03-17 11:30:00', 42.37, 7.63, 50.00, 'Tarjeta', 'Completada'),

(6, 7, 'Boleta', 'B001-00017', '2024-03-17 12:15:00', 59.32, 10.68, 70.00, 'Efectivo', 'Completada'),

(7, 3, 'Factura', 'F001-00005', '2024-03-17 14:00:00', 296.61, 53.39, 350.00, 'Transferencia', 'Completada'),

(8, 5, 'Boleta', 'B001-00018', '2024-03-17 15:15:00', 21.19, 3.81, 25.00, 'Efectivo', 'Completada'),

(9, 7, 'Boleta', 'B001-00019', '2024-03-17 16:30:00', 46.61, 8.39, 55.00, 'Tarjeta', 'Completada'),

(10, 3, 'Boleta', 'B001-00020', '2024-03-17 17:45:00', 63.56, 11.44, 75.00, 'Efectivo', 'Completada'),

(11, 5, 'Boleta', 'B001-00021', '2024-03-18 09:00:00', 33.90, 6.10, 40.00, 'Efectivo', 'Completada'),

(12, 7, 'Factura', 'F001-00006', '2024-03-18 10:15:00', 254.24, 45.76, 300.00, 'Transferencia', 'Completada'),

(13, 3, 'Boleta', 'B001-00022', '2024-03-18 11:30:00', 80.51, 14.49, 95.00, 'Tarjeta', 'Completada'),

(14, 5, 'Boleta', 'B001-00023', '2024-03-18 12:45:00', 101.69, 18.31, 120.00, 'Efectivo', 'Completada'),

(15, 7, 'Boleta', 'B001-00024', '2024-03-18 14:00:00', 46.61, 8.39, 55.00, 'Tarjeta', 'Completada');



-- Insertar Detalles de Venta

INSERT INTO DetalleVentas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES

(1, 1, 20, 0.50, 10.00),

(1, 6, 5, 1.30, 6.50),

(1, 14, 4, 0.80, 3.20),

(2, 2, 15, 0.70, 10.50),

(2, 5, 20, 0.65, 13.00),

(2, 14, 10, 0.80, 8.00),

(3, 17, 2, 65.00, 130.00),

(3, 31, 10, 1.50, 15.00),

(4, 4, 10, 1.20, 12.00),

(4, 7, 20, 0.45, 9.00),

(4, 37, 8, 0.40, 3.20),

(5, 19, 1, 60.00, 60.00),

(5, 35, 5, 0.80, 4.00),

(6, 16, 15, 2.00, 30.00),

(6, 24, 10, 1.10, 11.00),

(6, 31, 5, 1.50, 7.50),

(7, 13, 4, 25.00, 100.00),

(8, 10, 15, 0.90, 13.50),

(8, 35, 15, 0.80, 12.00),

(8, 37, 20, 0.40, 8.00),

(9, 15, 10, 1.00, 10.00),

(9, 16, 10, 2.00, 20.00),

(9, 48, 30, 0.30, 9.00),

(10, 1, 10, 0.50, 5.00),

(10, 2, 10, 0.70, 7.00),

(10, 12, 1, 6.00, 6.00),

(11, 20, 2, 30.00, 60.00),

(11, 38, 10, 1.80, 18.00),

(12, 18, 4, 50.00, 200.00),

(13, 19, 2, 60.00, 120.00),

(13, 47, 4, 1.20, 4.80),

(14, 7, 30, 0.45, 13.50),

(14, 24, 15, 1.10, 16.50),

(15, 6, 10, 1.30, 13.00),

(15, 14, 20, 0.80, 16.00),

(15, 35, 30, 0.80, 24.00),

(16, 9, 15, 1.00, 15.00),

(16, 22, 15, 1.40, 21.00),

(17, 1, 20, 0.50, 10.00),

(17, 4, 10, 1.20, 12.00),

(18, 29, 5, 40.00, 200.00),

(18, 34, 3, 13.00, 39.00),

(19, 3, 20, 1.50, 30.00),

(19, 8, 10, 2.40, 24.00),

(19, 14, 20, 0.80, 16.00),

(19, 35, 20, 0.80, 16.00),

(20, 15, 20, 1.00, 20.00),

(20, 16, 15, 2.00, 30.00),

(21, 50, 2, 24.00, 48.00),

(22, 7, 15, 0.45, 6.75),

(22, 14, 30, 0.80, 24.00),

(22, 48, 30, 0.30, 9.00),

(23, 10, 20, 0.90, 18.00),

(23, 21, 30, 1.10, 33.00),

(23, 42, 5, 20.00, 100.00),

(24, 16, 20, 2.00, 40.00),

(24, 24, 20, 1.10, 22.00),

(24, 31, 20, 1.50, 30.00),

(25, 13, 1, 25.00, 25.00),

(25, 40, 1, 18.00, 18.00),

(25, 47, 10, 1.20, 12.00),

(26, 10, 10, 0.90, 9.00),

(26, 35, 20, 0.80, 16.00),

(26, 38, 25, 1.80, 45.00),

(27, 17, 5, 65.00, 325.00),

(27, 20, 1, 30.00, 30.00),

(28, 1, 10, 0.50, 5.00),

(28, 4, 10, 1.20, 12.00),

(28, 7, 15, 0.45, 6.75),

(29, 6, 10, 1.30, 13.00),

(29, 14, 40, 0.80, 32.00),

(29, 48, 20, 0.30, 6.00),

(30, 16, 10, 2.00, 20.00),

(30, 23, 20, 1.00, 20.00),

(30, 35, 30, 0.80, 24.00);



-- Insertar Alertas de Stock

INSERT INTO AlertasStock (producto_id, tipo_alerta, mensaje, estado, fecha_generacion) VALUES

(11, 'Stock Bajo', 'El producto Clonazepam 2mg está por debajo del stock mínimo (30)', 'Activa', '2024-04-18 08:00:00'),

(13, 'Stock Bajo', 'El producto Salbutamol Inhalador está por debajo del stock mínimo (10)', 'Activa', '2024-04-18 08:00:00'),

(20, 'Próximo a Vencer', 'El producto Gotas Oftálmicas Refresh vence en menos de 3 meses', 'Activa', '2024-04-18 08:00:00'),

(25, 'Stock Bajo', 'El producto Azitromicina 500mg está por debajo del stock mínimo (20)', 'Activa', '2024-04-18 08:00:00'),

(27, 'Stock Bajo', 'El producto Hidrocortisona Crema 1% está por debajo del stock mínimo (10)', 'Activa', '2024-04-18 08:00:00'),

(28, 'Próximo a Vencer', 'El producto Ambroxol Jarabe vence en menos de 3 meses', 'Activa', '2024-04-18 08:00:00'),

(30, 'Stock Bajo', 'El producto Dexametasona 4mg está por debajo del stock mínimo (20)', 'Activa', '2024-04-18 08:00:00'),

(40, 'Stock Bajo', 'El producto Clotrimazol Crema 1% está por debajo del stock mínimo (10)', 'Activa', '2024-04-18 08:00:00'),

(41, 'Próximo a Vencer', 'El producto Amoxicilina+Ac. Clavulánico vence en menos de 3 meses', 'Activa', '2024-04-18 08:00:00'),

(42, 'Próximo a Vencer', 'El producto Dextrometorfano Jarabe vence en menos de 3 meses', 'Activa', '2024-04-18 08:00:00'),

(45, 'Stock Bajo', 'El producto Clobetasol Crema 0.05% está por debajo del stock mínimo (8)', 'Activa', '2024-04-18 08:00:00'),

(49, 'Próximo a Vencer', 'El producto Cefadroxilo 500mg vence en menos de 3 meses', 'Activa', '2024-04-18 08:00:00');



-- Triggers para actualizar stock automáticamente



-- Trigger para actualizar stock al insertar en DetalleCompras

DELIMITER $$

CREATE TRIGGER after_detalle_compra_insert

AFTER INSERT ON DetalleCompras

FOR EACH ROW

BEGIN

  UPDATE Productos 

  SET stock_actual = stock_actual + NEW.cantidad

  WHERE producto_id = NEW.producto_id;

END$$

DELIMITER ;



-- Trigger para actualizar stock al insertar en DetalleVentas

DELIMITER $$

CREATE TRIGGER after_detalle_venta_insert

AFTER INSERT ON DetalleVentas

FOR EACH ROW

BEGIN

  UPDATE Productos 

  SET stock_actual = stock_actual - NEW.cantidad

  WHERE producto_id = NEW.producto_id;

END$$

DELIMITER ;



-- Trigger para crear alertas automáticamente cuando el stock es bajo

DELIMITER $$

CREATE TRIGGER check_stock_after_update

AFTER UPDATE ON Productos

FOR EACH ROW

BEGIN

  IF NEW.stock_actual <= NEW.stock_minimo AND OLD.stock_actual > OLD.stock_minimo THEN

    INSERT INTO AlertasStock (producto_id, tipo_alerta, mensaje, estado, fecha_generacion)

    VALUES (NEW.producto_id, 'Stock Bajo', CONCAT('El producto ', NEW.nombre, ' está por debajo del stock mínimo (', NEW.stock_minimo, ')'), 'Activa', NOW());

  END IF;

   

  IF NEW.stock_actual = 0 AND OLD.stock_actual > 0 THEN

    INSERT INTO AlertasStock (producto_id, tipo_alerta, mensaje, estado, fecha_generacion)

    VALUES (NEW.producto_id, 'Sin Stock', CONCAT('El producto ', NEW.nombre, ' se ha agotado completamente'), 'Activa', NOW());

  END IF;

END$$

DELIMITER ;



-- Procedimientos almacenados útiles



-- Procedimiento para obtener productos con bajo stock

DELIMITER $$

CREATE PROCEDURE sp_productos_bajo_stock()

BEGIN

  SELECT p.codigo, p.nombre, p.stock_actual, p.stock_minimo, c.nombre as categoria

  FROM Productos p

  JOIN Categorias c ON p.categoria_id = c.categoria_id

  WHERE p.stock_actual <= p.stock_minimo

  ORDER BY (p.stock_actual / p.stock_minimo) ASC;

END$$

DELIMITER ;



-- Procedimiento para obtener productos próximos a vencer

DELIMITER $$

CREATE PROCEDURE sp_productos_proximos_vencer(IN dias_limite INT)

BEGIN

  SELECT p.codigo, p.nombre, p.fecha_vencimiento, 

      DATEDIFF(p.fecha_vencimiento, CURDATE()) as dias_restantes,

      p.stock_actual, c.nombre as categoria

  FROM Productos p

  JOIN Categorias c ON p.categoria_id = c.categoria_id

  WHERE p.fecha_vencimiento IS NOT NULL

  AND p.fecha_vencimiento <= DATE_ADD(CURDATE(), INTERVAL dias_limite DAY)

  AND p.stock_actual > 0

  ORDER BY p.fecha_vencimiento;

END$$

DELIMITER ;



-- Procedimiento para obtener ventas por período

DELIMITER $$

CREATE PROCEDURE sp_ventas_por_periodo(IN fecha_inicio DATE, IN fecha_fin DATE)

BEGIN

  SELECT v.venta_id, v.fecha_venta, 

      CONCAT(c.nombres, ' ', IFNULL(c.apellidos, '')) as cliente,

      CONCAT(e.nombres, ' ', e.apellidos) as vendedor,

      v.tipo_comprobante, v.num_comprobante, v.total, v.metodo_pago

  FROM Ventas v

  LEFT JOIN Clientes c ON v.cliente_id = c.cliente_id

  JOIN Empleados e ON v.empleado_id = e.empleado_id

  WHERE DATE(v.fecha_venta) BETWEEN fecha_inicio AND fecha_fin

  AND v.estado = 'Completada'

  ORDER BY v.fecha_venta DESC;

END$$

DELIMITER ;



-- Procedimiento para obtener top productos más vendidos

DELIMITER $$

CREATE PROCEDURE sp_top_productos_vendidos(IN limite INT, IN fecha_inicio DATE, IN fecha_fin DATE)

BEGIN

  SELECT p.codigo, p.nombre, 

      SUM(dv.cantidad) as unidades_vendidas,

      SUM(dv.subtotal) as total_ventas

  FROM DetalleVentas dv

  JOIN Productos p ON dv.producto_id = p.producto_id

  JOIN Ventas v ON dv.venta_id = v.venta_id

  WHERE v.estado = 'Completada'

  AND DATE(v.fecha_venta) BETWEEN fecha_inicio AND fecha_fin

  GROUP BY p.producto_id

  ORDER BY unidades_vendidas DESC

  LIMIT limite;

END$$

DELIMITER ;



-- Vistas útiles para el sistema



-- Vista de inventario actual

CREATE VIEW vw_inventario_actual AS

SELECT p.producto_id, p.codigo, p.nombre, c.nombre as categoria, 

    p.stock_actual, p.stock_minimo, p.precio_compra, p.precio_venta,

    p.fecha_vencimiento, pr.nombre as proveedor,

    CASE 

      WHEN p.stock_actual <= p.stock_minimo THEN 'Bajo'

      WHEN p.stock_actual > p.stock_minimo * 2 THEN 'Óptimo'

      ELSE 'Normal'

    END as estado_stock

FROM Productos p

JOIN Categorias c ON p.categoria_id = c.categoria_id

LEFT JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id

WHERE p.estado = 'Activo';



-- Vista de ventas diarias

CREATE VIEW vw_ventas_diarias AS

SELECT DATE(v.fecha_venta) as fecha,

    COUNT(*) as num_ventas,

    SUM(v.subtotal) as subtotal,

    SUM(v.igv) as igv,

    SUM(v.total) as total,

    SUM(CASE WHEN v.metodo_pago = 'Efectivo' THEN v.total ELSE 0 END) as total_efectivo,

    SUM(CASE WHEN v.metodo_pago = 'Tarjeta' THEN v.total ELSE 0 END) as total_tarjeta,

    SUM(CASE WHEN v.metodo_pago = 'Transferencia' THEN v.total ELSE 0 END) as total_transferencia

FROM Ventas v

WHERE v.estado = 'Completada'

GROUP BY DATE(v.fecha_venta)

ORDER BY fecha DESC;



-- Vista de productos vendidos por empleado

CREATE VIEW vw_ventas_por_empleado AS

SELECT e.empleado_id, e.nombres, e.apellidos,

    COUNT(DISTINCT v.venta_id) as num_ventas,

    SUM(v.total) as total_ventas,

    GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') as productos_vendidos

FROM Empleados e

JOIN Ventas v ON e.empleado_id = v.empleado_id

JOIN DetalleVentas dv ON v.venta_id = dv.venta_id

JOIN Productos p ON dv.producto_id = p.producto_id

WHERE v.estado = 'Completada'

AND e.rol = 'Vendedor'

GROUP BY e.empleado_id

ORDER BY total_ventas DESC;