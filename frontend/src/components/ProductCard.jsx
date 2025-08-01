import React from "react";

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.image_url} alt={product.name} style={{width: '100%', height: '200px', objectFit: 'cover'}}/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
    </div>
);

export default ProductCard;