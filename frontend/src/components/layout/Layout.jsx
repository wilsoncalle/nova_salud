import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
}
