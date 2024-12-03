import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = product => {
        const productIndex = cart.findIndex(item => item.id === product.id);
        if (productIndex >= 0) {
            const newCart = structuredClone(cart);
            newCart[productIndex].quantity++;
            setCart(newCart);
        } else {
            setCart(prevState => ([
                ...prevState,
                {
                    ...product,
                    quantity: 1
                }
            ]));
        }
    };

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item => item.id !== product.id));
    };

    const clearCart = () => { setCart([]); };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}