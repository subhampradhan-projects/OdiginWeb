/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Journal from './pages/Journal';
import Sizing from './pages/Sizing';
import Shipping from './pages/Shipping';
import Ethics from './pages/Ethics';
import Contact from './pages/Contact';
import SellerDashboard from './pages/SellerDashboard';
import Account from './pages/Account';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import { Product, CartItem } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { cart, setCart, user, signIn, logOut } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updated = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updated);
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black">
      <Navbar 
        cartCount={cartCount} 
        onOpenBag={() => setIsCartOpen(true)} 
        user={user}
        onSignIn={signIn}
        onSignOut={logOut}
      />
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/store" element={<Store onAddToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/sizing" element={<Sizing />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
