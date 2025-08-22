import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Layout from '../components/Layout';
import { useAuth } from "../hooks/useAuth";
import '../styles/Products.css';
import axios from 'axios';
import { useState } from 'react';

const Product = () => {
  const { products, error, loading } = useProducts();
  const { user } = useAuth();
  const [cartError, setCartError] = useState('');

  
  const handleBuyBtn = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/cart/add/`,
        {
          product_id: productId,
          quantity: 1
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        alert('Producto agregado al carrito');
      }

    } catch (error) {
      setCartError(error.response?.data?.error || 'Error al agregar el producto al carrito');
      alert('Error a la hora de agregar el producto al carrito');
    }
  }



  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="products-container">
      <Layout />
      {error && <div className="error-message">{error}</div>}
      {cartError && <div className='error-message'>{cartError}</div>}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.product_id} className="product-item">
            <ProductCard product={product} />
            {user?.role === 'admin' ? (
              <div className='product-btn admin-btns'>
                <button className="buy-btn" onClick={() => handleBuyBtn(product.product_id)}>Comprar</button>
                <button className="delete-btn">Eliminar Producto</button>
              </div>
            ) : (
              <div className='product-btn'>
                <button className="buy-btn" onClick={() => handleBuyBtn(product.product_id)}>Comprar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product;