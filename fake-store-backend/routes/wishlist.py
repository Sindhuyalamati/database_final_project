from flask import Blueprint, jsonify, request # type: ignore
from models import db, Wishlist, WishlistItem, Product

bp = Blueprint("wishlist", __name__)


# Get wishlist items
@bp.route("/wishlist", methods=["GET"])
def get_wishlist():
    wishlist = (
        Wishlist.query.first()
    )  # Simplified logic; modify for user-specific wishlist
    if not wishlist:
        return jsonify([]), 200

    wishlist_items = WishlistItem.query.filter_by(
        wishlist_id=wishlist.wishlist_id
    ).all()
    result = [
        {
            "product_id": item.product_id,
            "name": item.product.name,
            "price": item.product.price,
            "image": item.product.image_url,
        }
        for item in wishlist_items
    ]
    return jsonify(result), 200


# Add a product to the wishlist
@bp.route("/wishlist", methods=["POST"])
def add_to_wishlist():
    data = request.get_json()
    product_id = data.get("product_id")

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    wishlist = (
        Wishlist.query.first()
    )  # Simplified logic; modify for user-specific wishlist
    if not wishlist:
        wishlist = Wishlist()
        db.session.add(wishlist)
        db.session.commit()

    wishlist_item = WishlistItem.query.filter_by(
        wishlist_id=wishlist.wishlist_id, product_id=product_id
    ).first()
    if wishlist_item:
        return jsonify({"message": "Product already in wishlist"}), 200

    new_item = WishlistItem(wishlist_id=wishlist.wishlist_id, product_id=product_id)
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Product added to wishlist"}), 201


# Remove a product from the wishlist
@bp.route("/wishlist/<int:product_id>", methods=["DELETE"])
def remove_from_wishlist(product_id):
    wishlist = (
        Wishlist.query.first()
    )  # Simplified logic; modify for user-specific wishlist
    if not wishlist:
        return jsonify({"message": "Wishlist is empty"}), 404

    wishlist_item = WishlistItem.query.filter_by(
        wishlist_id=wishlist.wishlist_id, product_id=product_id
    ).first()
    if not wishlist_item:
        return jsonify({"message": "Product not in wishlist"}), 404

    db.session.delete(wishlist_item)
    db.session.commit()
    return jsonify({"message": "Product removed from wishlist"}), 200
