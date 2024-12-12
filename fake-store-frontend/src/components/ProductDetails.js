import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch the product details from your backend
                const response = await fetch(`http://127.0.0.1:5000/api/products/${id}`);
                const data = await response.json();
                setProduct(data);

                // Fetch all products to filter related products
                const relatedResponse = await fetch(`http://127.0.0.1:5000/api/products`);
                const allProducts = await relatedResponse.json();
                const filtered = allProducts.filter(
                    (p) => p.category === data.category && p.id !== data.id
                );
                setRelatedProducts(filtered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!product) return <div>Product not found.</div>;

    return (
        <div className="container">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="img-fluid mb-4" />
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
                Add to Cart
            </button>

            {/* Related Products Section */}
            <div className="mt-5">
                <h3>Related Products</h3>
                <div className="row">
                    {relatedProducts.map((related) => (
                        <div className="col-md-4" key={related.id}>
                            <div className="card mb-4">
                                <img src={related.image} className="card-img-top" alt={related.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{related.name}</h5>
                                    <p className="card-text">${related.price}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => addToCart(related)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
