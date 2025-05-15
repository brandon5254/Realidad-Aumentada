import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types/product';
import FeaturedProductCard from '../components/products/FeaturedProductCard';
import { ArrowRight, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('featured', '==', true),
          limit(4)
        );
        
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/32093139/pexels-photo-32093139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpeg" 
            alt="Fashion model" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide text-center">
            OMGEL STORE
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center font-light">
            Descubre nuestra colección y pruébala virtualmente con nuestra experiencia AR
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/productos" className="bg-white text-black px-8 py-3 text-base font-medium hover:bg-gray-100 transition-colors">
              Ver colección
            </Link>
            <Link to="/ar/featured" className="border border-white text-white px-8 py-3 text-base font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              Probar en AR
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-light">Productos destacados</h2>
          <Link 
            to="/productos" 
            className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
          >
            <span className="mr-2">Ver todos</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      {/* AR Experience Highlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <h2 className="text-2xl md:text-3xl font-light mb-4">La experiencia que brindamos con AR</h2>
              <p className="text-gray-700 mb-6">
                Nuestra tecnología de realidad aumentada te permite probar cómo te queda la ropa antes de comprarla. Una experiencia que llegó para revolucionar el mercado.
              </p>
              <Link 
                to="/ar/featured" 
                className="inline-block bg-black text-white px-8 py-3 text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Probar ahora
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/32092742/pexels-photo-32092742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpeg" 
                alt="AR shopping experience" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-4 text-center">Lo que nuestros clientes dicen</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Descubre por qué nuestros clientes confían en nosotros para sus compras de moda
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" 
                  alt="Cliente satisfecha" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "La experiencia AR es increíble. Pude probarme la ropa virtualmente antes de comprar y todo me quedó perfecto."
              </p>
              <p className="font-medium">María García</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg" 
                  alt="Cliente satisfecho" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "La calidad de la ropa es excelente y el servicio al cliente es excepcional. Totalmente recomendado."
              </p>
              <p className="font-medium">Carlos Rodríguez</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg" 
                  alt="Cliente satisfecha" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Las prendas son exactamente como se ven en las fotos. El envío fue rápido y el empaque muy cuidado."
              </p>
              <p className="font-medium">Ana Martínez</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/sobre-nosotros#testimonios" 
              className="inline-flex items-center text-black hover:text-gray-700"
            >
              <span className="mr-2">Conoce Sobre Nosotros</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;