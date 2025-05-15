import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface FeaturedProductCardProps {
  product: Product;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <Link to={`/productos/${product.id}`} className="block overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-light">{product.name}</h3>
          <p className="text-gray-900">${product.price.toFixed(2)}</p>
          <div className="flex gap-1 mt-2">
            {product.availableSizes.map((size, index) => (
              <span 
                key={index} 
                className="text-xs text-gray-500"
              >
                {size}{index < product.availableSizes.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductCard;