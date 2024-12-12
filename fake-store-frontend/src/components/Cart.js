import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, loading, error } = useContext(CartContext);

    // if (loading) {
    //     return (
    //         <div className="container text-center my-5">
    //             <div className="spinner-border text-primary" role="status">
    //                 <span className="visually-hidden">Loading...</span>
    //             </div>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="container my-5">
    //             <div className="alert alert-danger" role="alert">
    //                 {error}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="container my-5">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cart.map((item) => (
                            <li
                                key={item.product_id} // Use product_id to ensure uniqueness
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>${item.price} x {item.quantity}</p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-secondary btn-sm me-2"
                                        onClick={() =>
                                            updateQuantity(item.product_id, item.quantity - 1)
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm me-2"
                                        onClick={() =>
                                            updateQuantity(item.product_id, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeFromCart(item.product_id)} // Use item.product_id to remove from cart
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h4>Total: ${getTotalPrice()}</h4>
                    <button
                        className="btn btn-success"
                        onClick={() => (window.location.href = '/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
