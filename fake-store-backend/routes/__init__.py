from flask import Blueprint

# Import all blueprints
from routes.products import bp as product_routes_bp

# List of all blueprints to register
blueprints = [
    (product_routes_bp, "/api/products"),
]


def register_routes(app):
    """Function to register all blueprints to the Flask app."""
    for blueprint, url_prefix in blueprints:
        app.register_blueprint(blueprint, url_prefix=url_prefix)
