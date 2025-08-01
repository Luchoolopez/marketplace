import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import {getAllProducts} from '../services/api';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async() => {
      try{
        const data = await getAllProducts();
        setProducts(data);
      }catch(error){
        setError('Error al cargar los productos');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      {error && <div>{error}</div>}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
        {products.map(product => (
          <>
          <ProductCard key={product.product_id} product={product}/>
          <button>Comprar</button>
          </>

        ))}
      </div>
    </div>
  )
}

export default Product;