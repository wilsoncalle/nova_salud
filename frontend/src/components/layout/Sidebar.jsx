import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Package,
  Truck,
  User,
  Users,
  ShoppingCart,
  DollarSign,
  Bell,
  BarChart,
  Home,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const sections = [
  {
    title: 'Operaciones',
    items: [
      { to: '/ventas', label: 'Ventas', icon: DollarSign },
      { to: '/compras', label: 'Compras', icon: ShoppingCart },
      { to: '/alertas', label: 'Alertas', icon: Bell },
    ],
  },
  {
    title: 'Inventario',
    items: [
      { to: '/categorias', label: 'Categorías', icon: Box },
      { to: '/productos', label: 'Productos', icon: Package },
      { to: '/proveedores', label: 'Proveedores', icon: Truck },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { to: '/clientes', label: 'Clientes', icon: User },
      { to: '/empleados', label: 'Empleados', icon: Users },
    ],
  },
  
];

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Nova Salud</h2>
        <p>Farmacia</p>
      </div>
      
      <nav className="sidebar-nav">
        {/* Dashboard link */}
        <div className="sidebar-section">
          <ul className="sidebar-list">
            <li>
              <Link 
                to="/dashboard" 
                className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                <div className="sidebar-icon-container">
                  <Home className="sidebar-icon" />
                </div>
                <span>Dashboard</span>
                {isActive('/dashboard') && <div className="sidebar-active-indicator" />}
              </Link>
            </li>
          </ul>
        </div>

        {/* Other sections */}
        {sections.map((section) => (
          <div key={section.title} className="sidebar-section">
            <div className="sidebar-section-title">{section.title}</div>
            <ul className="sidebar-list">
              {section.items.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className={`sidebar-link ${isActive(to) ? 'active' : ''}`}
                  >
                    <div className="sidebar-icon-container">
                      <Icon className="sidebar-icon" />
                    </div>
                    <span>{label}</span>
                    {isActive(to) && <div className="sidebar-active-indicator" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/*
<div className="sidebar-footer">
  <div className="sidebar-user">
    <div className="sidebar-user-avatar">
      <span>NS</span>
    </div>
    <div className="sidebar-user-info">
      <span className="sidebar-user-name">Administrador</span>
      <span className="sidebar-user-role">Farmacia</span>
    </div>
  </div>
  <Link to="/logout" className="sidebar-logout">
    <LogOut size={16} />
  </Link>
</div>
*/}

    </aside>
  );
}