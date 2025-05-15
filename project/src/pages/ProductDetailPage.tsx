import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(productData);
          if (productData.availableSizes.length > 0) {
            setSelectedSize(productData.availableSizes[0]);
          }
        } else {
          console.error('No product found with this ID');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, quantity, selectedSize);
      alert('Producto añadido al carrito');
    } else if (!selectedSize) {
      alert('Por favor selecciona una talla');
    }
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-light mb-4">Producto no encontrado</h1>
        <p className="mb-6">El producto que buscas no existe o ha sido eliminado.</p>
        <Link 
          to="/productos" 
          className="bg-black text-white px-6 py-3 inline-block hover:bg-gray-800 transition-colors"
        >
          Ver todos los productos
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto py-8 md:py-16">
      <div className="flex flex-col md:flex-row">
        {/* Product Images */}
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <div className="relative">
            <div className="aspect-[3/4]">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 ${index === currentImageIndex ? 'border-2 border-black' : 'border border-gray-200'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-light mb-2">{product.name}</h1>
          <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h2 className="text-lg font-light mb-3">Descripción</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-light mb-3">Talla</h2>
            <div className="flex space-x-2">
              {product.availableSizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center border ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-light mb-3">Cantidad</h2>
            <div className="flex border border-gray-300 w-32">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center border-r border-gray-300"
              >
                -
              </button>
              <div className="flex-1 flex items-center justify-center">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="px-8 py-3 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag size={20} className="mr-2" />
              Añadir al carrito
            </button>
            
            {product.arLensId && product.arLensGroupId && (
              <Link 
                to={`/ar/${product.id}`}
                className="px-8 py-3 border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                Probar en AR
              </Link>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Envío gratis</h3>
              <p className="text-gray-600 text-sm">En pedidos superiores a $100</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Devoluciones gratuitas</h3>
              <p className="text-gray-600 text-sm">Dentro de los 30 días posteriores a la compra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;