import React from "react";
import '../styles/ProductCard.css'
const BACKEND_URL = 'http://localhost:3000'

const ProductCard = ({ product }) => {
    console.log('ProductCard:', product);
    return(
    <div className="product-card">
        <img src={BACKEND_URL + product.image_url} alt={product.name} style={{width: '100%', height: '200px', objectFit: 'cover'}}/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
    </div>
);
}

export default ProductCard;