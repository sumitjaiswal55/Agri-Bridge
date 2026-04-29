import React from 'react';
import ProductCard from './ProductCard';
import './Buyer.css';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid-container">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductGrid;