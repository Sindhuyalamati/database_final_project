import React, { useContext } from "react";
import { WishlistContext } from "../WishlistContext";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className="container">
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="row">
                    {wishlist.map((product) => (
                        <div className="col-md-4" key={product.product_id}>
                            <div className="card mb-4">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">${product.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFromWishlist(product.product_id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
