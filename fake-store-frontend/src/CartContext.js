import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state while fetching cart data
    const [error, setError] = useState(null); // To handle errors

    // Function to fetch cart data from the backend
    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/cart');
            if (response.data && response.status === 200) {
                setCart(response.data); // Set the cart data from the response
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching cart:", err);
            setError("Could not fetch cart items.");
            setLoading(false);
        }
    };

    // Initial cart fetch on component mount (Optional)
    useEffect(() => {
        fetchCart();
    }, []); // Empty dependency array to run only once when the component is mounted

    // Add a product to the cart via backend API and update local state
    const addToCart = async (product) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/api/cart',
                { product_id: product.id, quantity: 1 } // Default quantity is 1
            );

            if (response.status === 201 || response.status === 200) {
                // After adding to cart, fetch the latest cart data to ensure synchronization
                await fetchCart();
            }
        } catch (err) {
            console.error("Error adding product to cart:", err);
            setError("Could not add product to the cart.");
        }
    };


    // Remove a product from the cart via backend API and update local state
    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/cart/${productId}`);
            if (response.status === 200) {
                // After removing from cart, fetch the latest cart data
                await fetchCart();
            }
        } catch (err) {
            console.error("Error removing product from cart:", err);
            setError("Could not remove product from the cart.");
        }
    };

    // Update the quantity of a product in the cart and update state
    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:5000/api/cart/${productId}`,
                { quantity }
            );

            if (response.status === 200) {
                // After updating quantity, fetch the latest cart data
                await fetchCart();
            }
        } catch (err) {
            console.error("Error updating product quantity:", err);
            setError("Could not update product quantity.");
        }
    };

    // Calculate the total price of the cart
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        fetchCart, // Expose fetchCart to be used in other components
        loading,
        error
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
