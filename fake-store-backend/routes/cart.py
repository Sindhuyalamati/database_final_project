from flask import Blueprint, jsonify, request
from models import db, Cart, CartItem, Product

bp = Blueprint("cart", __name__)


# Get cart items (No JWT required)
@bp.route("/cart", methods=["GET"])
def get_cart():
    cart = Cart.query.first()  # Retrieve the first cart (simplified)

    if cart is None:
        return jsonify({"message": "Cart is empty"}), 200

    # Get cart items
    cart_items = CartItem.query.filter_by(cart_id=cart.cart_id).all()
    result = [
        {
            "product_id": item.product_id,
            "name": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity,
            "image": item.product.image_url,
        }
        for item in cart_items
    ]
    return jsonify(result), 200


# Add product to cart (No JWT required)
@bp.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    # Add to cart logic (you can adjust this part based on your requirements)
    cart = Cart.query.first()  # Create or get a cart (simplified)
    if not cart:
        cart = Cart()  # Create a new cart if it doesn't exist
        db.session.add(cart)
        db.session.commit()

    cart_item = CartItem.query.filter_by(
        cart_id=cart.cart_id, product_id=product_id
    ).first()
    if cart_item:
        cart_item.quantity += quantity  # Update quantity if product already exists
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Product quantity updated",
                    "cart_item": {
                        "product_id": cart_item.product_id,
                        "quantity": cart_item.quantity,
                    },
                }
            ),
            200,
        )
    else:
        new_item = CartItem(
            cart_id=cart.cart_id, product_id=product_id, quantity=quantity
        )
        db.session.add(new_item)
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Product added to cart",
                    "cart_item": {
                        "product_id": new_item.product_id,
                        "quantity": new_item.quantity,
                    },
                }
            ),
            201,
        )


# Remove product from cart (No JWT required)
@bp.route("/cart/<int:product_id>", methods=["DELETE"])
def remove_from_cart(product_id):
    cart = Cart.query.first()  # Retrieve the first cart (simplified)

    if not cart:
        return jsonify({"message": "Cart is empty"}), 404

    cart_item = CartItem.query.filter_by(
        cart_id=cart.cart_id, product_id=product_id
    ).first()
    if not cart_item:
        return jsonify({"message": "Product not in cart"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Product removed from cart"}), 200


# Update product quantity in the cart (No JWT required)
@bp.route("/cart/<int:product_id>", methods=["PATCH"])
def update_quantity(product_id):
    data = request.get_json()
    new_quantity = data.get("quantity")

    if new_quantity is None or new_quantity <= 0:
        return jsonify({"message": "Invalid quantity"}), 400

    # Find the cart and the cart item for the product
    cart = Cart.query.first()  # Retrieve the first cart (simplified)
    if not cart:
        return jsonify({"message": "Cart is empty"}), 404

    cart_item = CartItem.query.filter_by(
        cart_id=cart.cart_id, product_id=product_id
    ).first()

    if not cart_item:
        return jsonify({"message": "Product not found in cart"}), 404

    # Update the quantity of the cart item
    cart_item.quantity = new_quantity
    db.session.commit()

    return jsonify({"message": "Product quantity updated"}), 200
