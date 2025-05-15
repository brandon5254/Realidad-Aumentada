import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light mb-8 text-center">Sobre Nosotros</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-light mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              La historia de OMGEL nace del sueño compartido de dos jóvenes universitarios apasionados por la moda: Omar y Miguel Ángel. Desde años anteriores, ambos sintieron una profunda conexión con las tendencias de ropa como el Y2K y el Streetwear, tendencias que van muy ligadas con el hip hop norteamericano, viendo en la moda una forma auténtica de expresión personal. Así, uniendo partes de sus nombres: OM de Omar y GEL de Ángel, dieron vida a una marca que representa creatividad y autenticidad.
            </p>
            <p className="text-gray-600">
              Nuestra misión es hacer que la moda sea más accesible y sostenible, permitiendo a nuestros 
              clientes tomar decisiones informadas sobre sus compras mediante nuestra tecnología de 
              prueba virtual.
            </p>
          </div>
          <div className="relative h-96">
            <img 
              src="https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg"
              alt="Nuestro equipo" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-light mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-light mb-3">Innovación</h3>
              <p className="text-gray-600">
                Constantemente buscamos nuevas formas de mejorar la experiencia de compra 
                online mediante tecnología de vanguardia.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light mb-3">Sostenibilidad</h3>
              <p className="text-gray-600">
                Nos comprometemos con prácticas sostenibles y éticas en toda nuestra 
                cadena de producción.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light mb-3">Calidad</h3>
              <p className="text-gray-600">
                Cada prenda es cuidadosamente seleccionada para garantizar los más 
                altos estándares de calidad.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-light mb-6 text-center">Tecnología AR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Nuestra tecnología de realidad aumentada permite a los clientes probar 
                virtualmente las prendas antes de comprarlas, reduciendo las devoluciones 
                y mejorando la satisfacción del cliente.
              </p>
              <p className="text-gray-600">
                Continuamente mejoramos nuestros algoritmos y modelos 3D para ofrecer 
                una experiencia cada vez más realista y precisa.
              </p>
            </div>
            <div className="relative h-64">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                alt="Tecnología AR" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;