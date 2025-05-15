import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types/product';
import ProductCard from '../components/products/ProductCard';
import { Filter, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    priceRange: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('categoria');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let q = query(collection(db, 'products'));
        
        if (filters.category) {
          q = query(q, where('category', '==', filters.category));
        }
        
        const querySnapshot = await getDocs(q);
        let fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        // Client-side filtering for size and price
        if (filters.size) {
          fetchedProducts = fetchedProducts.filter(product => 
            product.availableSizes.includes(filters.size)
          );
        }
        
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          fetchedProducts = fetchedProducts.filter(product => 
            product.price >= min && (max ? product.price <= max : true)
          );
        }
        
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      size: '',
      priceRange: '',
    });
  };

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-light mb-4">Productos</h1>
        <p className="text-gray-600">Descubre nuestra colección de prendas.</p>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded"
        >
          <Filter size={18} className="mr-2" />
          Filtros
        </button>
        
        {Object.values(filters).some(value => value) && (
          <button 
            onClick={clearFilters}
            className="text-gray-500 flex items-center"
          >
            <X size={18} className="mr-1" />
            Limpiar
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <aside className={`md:w-64 md:pr-8 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-24">
            <div className="md:hidden flex justify-between items-center mb-4">
              <h3 className="font-medium">Filtros</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-light mb-3">Categoría</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="" 
                    checked={filters.category === ''} 
                    onChange={() => handleFilterChange('category', '')}
                    className="mr-2"
                  />
                  Todas
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="hombre" 
                    checked={filters.category === 'Hombre'} 
                    onChange={() => handleFilterChange('category', 'Hombre')}
                    className="mr-2"
                  />
                  Hombre
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="mujer" 
                    checked={filters.category === 'Mujer'} 
                    onChange={() => handleFilterChange('category', 'Mujer')}
                    className="mr-2"
                  />
                  Mujer
                </label>
                <label className="flex items-center">
                  
                  
                  
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-light mb-3">Talla</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="" 
                    checked={filters.size === ''} 
                    onChange={() => handleFilterChange('size', '')}
                    className="mr-2"
                  />
                  Todas
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="XS" 
                    checked={filters.size === 'XS'} 
                    onChange={() => handleFilterChange('size', 'XS')}
                    className="mr-2"
                  />
                  XS
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="S" 
                    checked={filters.size === 'S'} 
                    onChange={() => handleFilterChange('size', 'S')}
                    className="mr-2"
                  />
                  S
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="M" 
                    checked={filters.size === 'M'} 
                    onChange={() => handleFilterChange('size', 'M')}
                    className="mr-2"
                  />
                  M
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="L" 
                    checked={filters.size === 'L'} 
                    onChange={() => handleFilterChange('size', 'L')}
                    className="mr-2"
                  />
                  L
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="XL" 
                    checked={filters.size === 'XL'} 
                    onChange={() => handleFilterChange('size', 'XL')}
                    className="mr-2"
                  />
                  XL
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-light mb-3">Precio</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value="" 
                    checked={filters.priceRange === ''} 
                    onChange={() => handleFilterChange('priceRange', '')}
                    className="mr-2"
                  />
                  Todos
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value="0-50" 
                    checked={filters.priceRange === '0-50'} 
                    onChange={() => handleFilterChange('priceRange', '0-50')}
                    className="mr-2"
                  />
                  $0 - $50
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value="50-100" 
                    checked={filters.priceRange === '50-100'} 
                    onChange={() => handleFilterChange('priceRange', '50-100')}
                    className="mr-2"
                  />
                  $50 - $100
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value="100-200" 
                    checked={filters.priceRange === '100-200'} 
                    onChange={() => handleFilterChange('priceRange', '100-200')}
                    className="mr-2"
                  />
                  $100 - $200
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value="200-" 
                    checked={filters.priceRange === '200-'} 
                    onChange={() => handleFilterChange('priceRange', '200-')}
                    className="mr-2"
                  />
                  Más de $200
                </label>
              </div>
            </div>
            
            <button 
              onClick={clearFilters}
              className="w-full py-2 border border-gray-300 hover:bg-gray-50 transition-colors mt-4"
            >
              Limpiar filtros
            </button>
          </div>
        </aside>
        
        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid place-items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No se encontraron productos con los filtros seleccionados.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;