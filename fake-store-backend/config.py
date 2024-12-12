import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')  # Fallback to SQLite if not set
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')  # Fallback to a default secret key
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000')  # Frontend origin
 
