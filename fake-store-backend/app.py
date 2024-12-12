from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Added to allow cross-origin requests
from dotenv import load_dotenv
import os
import traceback

# Load environment variables
load_dotenv()

# Import db globally to ensure it's accessible
from models import db

# Import the new cart blueprint
from routes.cart import bp as cart_routes_bp
from routes.products import bp as product_routes_bp
from routes.wishlist import bp as wishlist_routes_bp



def create_app():
    """Factory function to create and configure the Flask app."""
    app = Flask(__name__)

    # Configure the app
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

    # Verify environment variables
    if not app.config["SQLALCHEMY_DATABASE_URI"]:
        raise ValueError("DATABASE_URL is not set in the .env file.")
    if not app.config["JWT_SECRET_KEY"]:
        raise ValueError("SECRET_KEY is not set in the .env file.")

    # Initialize the database
    db.init_app(app)

    # Initialize JWT Manager
    jwt = JWTManager(app)

    # Enable CORS for all routes
    CORS(
        app, resources={r"/*": {"origins": "http://localhost:3000"}}
    )  # Allow requests from frontend

    # Register blueprints (routes)
    app.register_blueprint(product_routes_bp, url_prefix="/api/products")
    app.register_blueprint(cart_routes_bp, url_prefix="/api")  # For cart routes
    app.register_blueprint(wishlist_routes_bp, url_prefix="/api")

    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        try:
            # Attempt to create database tables
            db.create_all()
            print("✅ Database tables created successfully.")
        except Exception as e:
            print("❌ Error creating database tables:")
            print(str(e))
            traceback.print_exc()  # Print the full traceback for debugging

    # Run the Flask application
    app.run(debug=True)
