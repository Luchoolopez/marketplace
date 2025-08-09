import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Layout from '../components/Layout';
import { useAuth } from "../hooks/useAuth";
import '../styles/Products.css';

const Product = () => {
  const {products, error, loading} = useProducts();
  const { user } = useAuth();
  if(loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="products-container">
      <Layout/>
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.product_id} className="product-item">
            <ProductCard product={product}/>
            { user?.role === 'admin' ? (
              <div className='product-btn admin-btns'>
                <button className="buy-btn">Comprar</button>
                <button className="delete-btn">Eliminar Producto</button>
              </div>
            ) : (
              <div className='product-btn'>
                <button className="buy-btn">Comprar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product;