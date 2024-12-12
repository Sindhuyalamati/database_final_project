import requests
from flask import Blueprint, jsonify, request
from models import db, Product, Category

bp = Blueprint('products', __name__)

FAKE_STORE_API = "https://fakestoreapi.com/products"

# Route to fetch and store data from the Fake Store API
@bp.route('/fetch-and-store', methods=['GET'])
def fetch_and_store():
    try:
        # Fetch data from the Fake Store API
        response = requests.get(FAKE_STORE_API)
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Fake Store API'}), 500

        products = response.json()

        for product in products:
            # Handle categories
            category_name = product['category']
            category = Category.query.filter_by(name=category_name).first()

            if not category:
                # Add new category
                category = Category(name=category_name)
                db.session.add(category)
                db.session.commit()

            # Handle products
            existing_product = Product.query.filter_by(name=product['title']).first()
            if not existing_product:
                new_product = Product(
                    name=product['title'],
                    description=product['description'],
                    price=product['price'],
                    image_url=product['image'],
                    category_id=category.category_id
                )
                db.session.add(new_product)

        db.session.commit()
        return jsonify({'message': 'Data fetched and stored successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch all products from the database
@bp.route('/', methods=['GET'])
def get_products():
    try:
        # Query all products from the database
        products = Product.query.all()

        # Format the response
        result = [
            {
                "id": product.product_id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "image": product.image_url,
                "category": Category.query.get(product.category_id).name  # Fetch category name
            }
            for product in products
        ]

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch a single product by ID
@bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        # Query the product by ID
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        # Format the response
        result = {
            "id": product.product_id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.image_url,
            "category": Category.query.get(product.category_id).name  # Fetch category name
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to add a new product
@bp.route('/', methods=['POST'])
def add_product():
    try:
        # Get data from the request body
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'description', 'price', 'image_url', 'category_id']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if the category exists
        category = Category.query.get(data['category_id'])
        if not category:
            return jsonify({'error': 'Invalid category ID'}), 400

        # Create a new product
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=data['image_url'],
            category_id=data['category_id']
        )
        db.session.add(new_product)
        db.session.commit()

        # Respond with the created product
        return jsonify({
            "id": new_product.product_id,
            "name": new_product.name,
            "description": new_product.description,
            "price": new_product.price,
            "image": new_product.image_url,
            "category": category.name
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
