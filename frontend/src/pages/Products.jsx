import React from 'react'
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Layout from '../components/Layout'

const Product = () => {
  const {products, error, loading} = useProducts();
  if(loading) return <div>Cargando productos...</div>;

  return (
    <div>
      <Layout/>
      <h2>Productos</h2>
      {error && <div>{error}</div>}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
        {products.map(product => (
          <div key={product.product_id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ProductCard product={product}/>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product;