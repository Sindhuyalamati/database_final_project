from models import db
from sqlalchemy.orm import relationship # type: ignore


# Cart model: Represents the user's shopping cart
class Cart(db.Model):
    __tablename__ = "carts"
    cart_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id")
    )  # Foreign Key linking to users table
    products = relationship(
        "CartItem", backref="cart", lazy=True
    )  # Relationship with CartItem model

    def __repr__(self):
        return f"<Cart {self.cart_id}, User {self.user_id}>"


# CartItem model: Represents individual items in the user's cart
class CartItem(db.Model):
    __tablename__ = "cart_items"
    cart_item_id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(
        db.Integer, db.ForeignKey("carts.cart_id")
    )  # Foreign Key linking to carts table
    product_id = db.Column(
        db.Integer, db.ForeignKey("products.product_id")
    )  # Foreign Key linking to products table
    quantity = db.Column(db.Integer, default=1)  # Default quantity is 1

    # Relationship with Product model to get product details
    product = relationship("Product", backref="cart_items")

    def __repr__(self):
        return f"<CartItem {self.cart_item_id}, Cart {self.cart_id}, Product {self.product_id}, Quantity {self.quantity}>"
