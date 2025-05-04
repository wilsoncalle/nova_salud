
# Nova Salud - Sistema de Gestión para Botica



Este proyecto implementa un sistema completo de gestión para la botica "Nova Salud", incluyendo control de inventario, ventas, compras, y gestión de clientes y proveedores.



## Estructura del Proyecto



El proyecto está dividido en dos partes principales:



### Frontend (React)

- Interfaz de usuario desarrollada con React y Vite

- Componentes modulares y reutilizables

- Sistema de rutas con React Router

- Servicios para comunicación con la API



### Backend (Node.js/Express)

- API RESTful desarrollada con Express.js

- Conexión a base de datos MySQL

- Controladores para cada entidad del sistema

- Rutas API organizadas por funcionalidad



## Requisitos



- Node.js (v16 o superior)

- MySQL (v8 o superior)

- npm o yarn



## Instalación



### Backend

1. Navegar al directorio del backend: cd nova-salud/backend

2. Instalar dependencias: 
pm install

3. Configurar variables de entorno en el archivo .env

4. Crear la base de datos usando el script en sql/database_schema.sql

5. Iniciar el servidor: 
pm run dev



### Frontend

1. Navegar al directorio del frontend: cd nova-salud/frontend

2. Instalar dependencias: 
pm install

3. Iniciar el servidor de desarrollo: 
pm run dev



## Funcionalidades



- Gestión de productos y categorías

- Control de inventario con alertas de stock

- Registro de ventas y compras 

- Gestión de clientes y proveedores

- Generación de reportes

- Dashboard con métricas importantes

