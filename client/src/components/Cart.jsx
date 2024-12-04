import { useState, useEffect, useId } from 'react';
import './Cart.css';

import { CartIcon, ClearCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAddToCart = () => {
    addToCart();
    setIsAdded(true);
  };

  return (
    <li className={isAdded ? 'cart-item-added' : ''}>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Cantidad: {quantity}
        </small>
        <button onClick={handleAddToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <div className="cart-header">
          <h2>Carrito</h2>
          <label className='close-cart-button' htmlFor={cartCheckboxId}>
            &times;
          </label>
        </div>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <div className="total-price">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>

        <button className="clear-cart-button" onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}