from flask_sqlalchemy import SQLAlchemy


# Initialize SQLAlchemy
db = SQLAlchemy()


# Function to initialize the database with the Flask app
def init_db(app):
    db.init_app(app)


from models.product import Product
from models.category import Category
from models.cart import Cart, CartItem  # Import Cart and CartItem here
from models.user import User
from models.wishlist import Wishlist, WishlistItem

__all__ = [
    "db",
    "init_db",
    "Product",
    "Category",
    "Cart",
    "CartItem",
    "Wishlist",
    "WishlistItem",
    "User",
]
# __all__ = ["db", "init_db", "Product", "Category", "Cart", "CartItem", "User"]
