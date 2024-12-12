import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CartContext } from '../CartContext'; // Import CartContext

const Navbar = ({ setSearchQuery }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchInput, setSearchInput] = useState(''); // Local state for search input
    const auth = getAuth();
    const navigate = useNavigate();
    const { fetchCart } = useContext(CartContext); // Access fetchCart from context

    useState(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Set true if user exists, false otherwise
        });

        return () => unsubscribe();
    }, [auth]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput); // Pass the search input to the parent component
    };

    const handleLogout = async () => {
        // Clear the cart from localStorage on logout
        localStorage.removeItem('cart');

        // Perform Firebase logout
        await signOut(auth);
        alert('Logged out successfully!');

        // Redirect to the login page after logging out
        navigate('/login');
    };

    const handleCartClick = async () => {
        await fetchCart(); // Fetch the latest cart data
        navigate('/cart'); // Navigate to the cart page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Fake Store</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? (
                        <>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Products</Link>
                                </li>
                                <li className="nav-item">
                                    {/* Modify the Cart link to trigger fetchCart on click */}
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleCartClick}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Cart
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/wishlist">Wishlist</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/checkout">Checkout</Link>
                                </li>
                            </ul>
                            <form className="d-flex me-3" onSubmit={handleSearch}>
                                <input
                                    type="search"
                                    className="form-control me-2"
                                    placeholder="Search products..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
