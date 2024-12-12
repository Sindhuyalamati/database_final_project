from models import db, Cart, CartItem
from app import create_app  # Corrected import from app.py

# Initialize the Flask app
app = create_app()


# Function to delete all items from the cart
def delete_all_cart_items():
    with app.app_context():  # Ensure we are inside the app context
        # First, delete all CartItems
        db.session.query(CartItem).delete()  # Delete all CartItems
        db.session.commit()
        print("✅ All CartItems have been deleted.")


if __name__ == "__main__":
    delete_all_cart_items()
