import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter here
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query

    return (
        <>
            <Navbar setSearchQuery={setSearchQuery} />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductList searchQuery={searchQuery} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <ProtectedRoute>
                            <ProductDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
