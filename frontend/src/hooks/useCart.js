import { useState } from "react";

export function useCart(){
    const [cart, setCart] = useState([]);

    const addToCart = (product) => setCart([...cart, product]);
    const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));
    const clearCart = () => setCart([]);

    return {cart, addToCart, removeFromCart, clearCart}
}