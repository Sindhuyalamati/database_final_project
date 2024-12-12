import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';

const Checkout = () => {
    const { cart, getTotalPrice, setCart } = useContext(CartContext);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
            alert('Please fill in all fields');
            return;
        }
        alert('Order placed successfully!');
        setCart([]); // Clear the cart
    };

    return (
        <div className="container">
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Add some products to proceed.</p>
            ) : (
                <>
                    {/* Cart Items */}
                    <ul className="list-group mb-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </li>
                        ))}
                    </ul>

                    <h4>Total: ${getTotalPrice()}</h4>

                    {/* Customer Details Form */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={customerDetails.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={customerDetails.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={customerDetails.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Place Order Button */}
                    <button className="btn btn-success" onClick={handleCheckout}>
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Checkout;
