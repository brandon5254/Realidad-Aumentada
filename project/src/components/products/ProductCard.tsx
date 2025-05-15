import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <Link to={`/productos/${product.id}`} className="block relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-black py-2 px-4 flex items-center">
            <Eye size={18} className="mr-2" />
            Ver detalles
          </span>
        </div>
      </Link>
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
    </div>
  );
};

export default ProductCard;