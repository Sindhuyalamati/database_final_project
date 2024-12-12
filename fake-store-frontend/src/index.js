import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import CartProvider from './CartContext';
import WishlistProvider from './WishlistContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root'); // Get the root DOM node
const root = createRoot(container); // Create a React root

root.render(
  <Router> {/* Wrap the entire app inside Router */}
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </Router>
);
