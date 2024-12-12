from models import db
from sqlalchemy.orm import relationship # type: ignore


class Wishlist(db.Model):
    __tablename__ = "wishlists"
    wishlist_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))  # Assuming a User model
    products = relationship("WishlistItem", backref="wishlist", lazy=True)


class WishlistItem(db.Model):
    __tablename__ = "wishlist_items"
    wishlist_item_id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey("wishlists.wishlist_id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.product_id"))
    product = relationship("Product", backref="wishlist_items")

    def __repr__(self):
        return f"<WishlistItem {self.wishlist_item_id}, Wishlist {self.wishlist_id}, Product {self.product_id}>"
