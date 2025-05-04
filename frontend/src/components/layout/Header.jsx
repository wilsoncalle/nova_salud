import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificacionesMenu from './NotificacionesMenu';
import './Header.css';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const today = new Date().toLocaleString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Capitalizar primera letra
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);
  
  // Definir las vistas principales de la aplicación
  const mainViews = [
    { name: 'Dashboard', path: '/dashboard', keywords: ['inicio', 'panel', 'principal', 'dashboard'] },
    { name: 'Productos', path: '/productos', keywords: ['producto', 'inventario', 'medicamentos', 'stock'] },
    { name: 'Ventas', path: '/ventas', keywords: ['venta', 'factura', 'boleta', 'transacción'] },
    { name: 'Compras', path: '/compras', keywords: ['compra', 'adquisición', 'proveedor', 'ingreso'] },
    { name: 'Clientes', path: '/clientes', keywords: ['cliente', 'paciente', 'persona', 'comprador'] },
    { name: 'Empleados', path: '/empleados', keywords: ['empleado', 'trabajador', 'personal', 'staff'] },
    { name: 'Proveedores', path: '/proveedores', keywords: ['proveedor', 'distribuidor', 'suministrador'] },
    { name: 'Categorías', path: '/categorias', keywords: ['categoria', 'clasificación', 'tipo'] },
    { name: 'Alertas', path: '/alertas', keywords: ['alerta', 'notificación', 'aviso', 'recordatorio'] }
  ];
  
  // Filtrar las vistas según el término de búsqueda
  const filteredViews = searchTerm.trim() === '' 
    ? [] 
    : mainViews.filter(view => {
        const searchLower = searchTerm.toLowerCase();
        return view.name.toLowerCase().includes(searchLower) || 
               view.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
      });
  
  // Manejar la navegación a la vista seleccionada
  const handleViewSelect = (path) => {
    navigate(path);
    setSearchTerm('');
    setShowResults(false);
  };
  
  // Cerrar los resultados cuando se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Bienvenido a Nova Salud</h1>
        <p className="header-date">{formattedDate}</p>
      </div>
      
      <div className="header-actions">
        <div className="header-search" ref={searchRef}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar vistas..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
          />
          {searchTerm && (
            <button 
              className="header-search-clear" 
              onClick={() => {
                setSearchTerm('');
                setShowResults(false);
              }}
            >
              <X size={16} />
            </button>
          )}
          
          {showResults && filteredViews.length > 0 && (
            <div className="header-search-results">
              {filteredViews.map((view) => (
                <div 
                  key={view.path} 
                  className="header-search-result-item"
                  onClick={() => handleViewSelect(view.path)}
                >
                  {view.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Componente de notificaciones */}
        <NotificacionesMenu />
      </div>
    </header>
  );
}
