// Cambia la extensión de este archivo a .jsx para evitar errores de JSX con Vite/esbuild.
// Renombra este archivo de routes.js a routes.jsx y actualiza los imports en App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Categorias = () => <h2>Página de Categorías</h2>;
const Productos = () => <h2>Página de Productos</h2>;
const Proveedores = () => <h2>Página de Proveedores</h2>;
const Clientes = () => <h2>Página de Clientes</h2>;
const Empleados = () => <h2>Página de Empleados</h2>;
const Compras = () => <h2>Página de Compras</h2>;
const Ventas = () => <h2>Página de Ventas</h2>;
const Alertas = () => <h2>Página de Alertas</h2>;
const Reportes = () => <h2>Página de Reportes</h2>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/proveedores" element={<Proveedores />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/empleados" element={<Empleados />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/alertas" element={<Alertas />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="*" element={<h2>Bienvenido a Nova Salud</h2>} />
    </Routes>
  );
}
