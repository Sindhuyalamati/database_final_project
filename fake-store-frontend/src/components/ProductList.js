import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../CartContext';
import { WishlistContext } from '../WishlistContext'; // Import WishlistContext
import { Link } from 'react-router-dom';

const ProductList = ({ searchQuery }) => {
    const [products, setProducts] = useState([]); // Fetch products from the backend
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [filter, setFilter] = useState('All'); // Filter by category
    const [sort, setSort] = useState('default'); // Sort state
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [cartNotification, setCartNotification] = useState(''); // Cart notification state
    const [wishlistNotification, setWishlistNotification] = useState(''); // Wishlist notification state
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: ''
    }); // State for new product form
    const [addProductNotification, setAddProductNotification] = useState(''); // Notification for adding products
    const [showAddProductForm, setShowAddProductForm] = useState(false); // Toggle state for the form
    const itemsPerPage = 4; // Number of products per page

    const { addToCart } = useContext(CartContext); // Access CartContext
    const { addToWishlist } = useContext(WishlistContext); // Access WishlistContext

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:5000/api/products/');
                if (!response.ok) {
                    throw new Error('Failed to fetch products.');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products by category and search query
    const filteredProducts = products.filter(
        (product) =>
            (filter === 'All' || product.category.toLowerCase() === filter.toLowerCase()) &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products based on selected sort option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === 'priceLow') return a.price - b.price; // Low to high
        if (sort === 'priceHigh') return b.price - a.price; // High to low
        if (sort === 'alphabetical') return a.name.localeCompare(b.name); // Alphabetical order
        return 0; // Default order
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        addToCart(product);
        setCartNotification(`${product.name} added to cart successfully!`);
        clearTimeout(window.cartNotificationTimeout); // Clear any existing timeout
        window.cartNotificationTimeout = setTimeout(() => setCartNotification(''), 3000); // Clear after 3 seconds
    };

    // Handle Add to Wishlist
    const handleAddToWishlist = (product) => {
        addToWishlist(product);
        setWishlistNotification(`${product.name} added to wishlist successfully!`);
        clearTimeout(window.wishlistNotificationTimeout); // Clear any existing timeout
        window.wishlistNotificationTimeout = setTimeout(() => setWishlistNotification(''), 3000); // Clear after 3 seconds
    };

    // Handle Add New Product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to add product.');
            }

            const addedProduct = await response.json();
            setProducts([...products, addedProduct]); // Add the new product to the product list
            setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' }); // Clear form
            setAddProductNotification('Product added successfully!');
            setTimeout(() => setAddProductNotification(''), 3000); // Clear notification after 3 seconds
        } catch (err) {
            console.error('Error adding product:', err);
            setAddProductNotification('Failed to add product. Please try again.');
            setTimeout(() => setAddProductNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div className="container"><p>Loading products...</p></div>;
    }

    if (error) {
        return <div className="container"><p className="text-danger">{error}</p></div>;
    }

    return (
        <div className="container">
            <h2>Product List</h2>

            {/* Button to toggle the Add Product Form */}
            <button
                className="btn btn-secondary mb-4"
                onClick={() => setShowAddProductForm(!showAddProductForm)}
            >
                {showAddProductForm ? 'Hide Add Product Form' : 'Show Add Product Form'}
            </button>

            {/* Add New Product Form */}
            {showAddProductForm && (
                <form onSubmit={handleAddProduct} className="mb-4">
                    <h4>Add New Product</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Image URL"
                            value={newProduct.image_url}
                            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Category ID"
                            value={newProduct.category_id}
                            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            )}

            {/* Add Product Notification */}
            {addProductNotification && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                    }}
                >
                    {addProductNotification}
                </div>
            )}

            {/* Cart Notification */}
            {cartNotification && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                    }}
                >
                    {cartNotification}
                </div>
            )}

            {/* Wishlist Notification */}
            {wishlistNotification && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                    }}
                >
                    {wishlistNotification}
                </div>
            )}

            {/* Existing Product List */}
            <div className="row">
                {currentProducts.map((product) => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card mb-4">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleAddToWishlist(product)}
                                >
                                    Add to Wishlist
                                </button>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn btn-secondary"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination mt-4">
                <button
                    className="btn btn-outline-primary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-outline-primary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
