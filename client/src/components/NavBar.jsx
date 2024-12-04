import React from 'react';
import './NavBar.css';
import { Cart } from './Cart.jsx';

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo"> MyShoppingApp 🛒 </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/products">Agregar/Editar Producto</a>
          </li>
          <li>
            <a href="/stats">Gráficos y Estadísticas</a>
          </li>
          <li>
            <a href="/stock"> Inventario </a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="cart-container">
          <Cart />
        </div>
        <a href="/account" className="user-icon">
          <i className="fas fa-user"></i>
        </a>
      </div>
    </nav>
  );
}