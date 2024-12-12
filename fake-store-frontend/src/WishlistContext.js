import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/wishlist");
                setWishlist(response.data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, []);

    const addToWishlist = async (product) => {
        try {
            await axios.post("http://127.0.0.1:5000/api/wishlist", { product_id: product.id });
            setWishlist((prev) => [...prev, product]);
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/wishlist/${productId}`);
            setWishlist((prev) => prev.filter((item) => item.product_id !== productId)); // Update state
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
