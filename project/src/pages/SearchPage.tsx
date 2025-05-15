import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types/product';
import ProductCard from '../components/products/ProductCard';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        // Get all products and filter client-side for case-insensitive search
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        // Case-insensitive search on name and description
        const searchResults = allProducts.filter(product => {
          const searchTerms = searchQuery.toLowerCase().split(' ');
          const productName = product.name.toLowerCase();
          const productDescription = product.description.toLowerCase();
          
          return searchTerms.every(term => 
            productName.includes(term) || productDescription.includes(term)
          );
        });
        
        setProducts(searchResults);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [searchQuery]);

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-light mb-2">Resultados de búsqueda</h1>
        <p className="text-gray-600">
          {searchQuery ? (
            `${products.length} resultados para "${searchQuery}"`
          ) : (
            'Ingresa un término de búsqueda'
          )}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            Usa la barra de búsqueda para encontrar productos.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;