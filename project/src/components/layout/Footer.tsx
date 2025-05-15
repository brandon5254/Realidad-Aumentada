import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light tracking-wider mb-4">OMGEL STORE</h3>
            <p className="text-gray-400 mb-6">
              La moda que se adapta a tu estilo, con experiencias AR innovadoras.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/omgeltry?igsh=aWppczRvZ2tmYzJk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="text-lg font-light mb-4">Tienda</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/productos?categoria=Hombre" className="text-gray-400 hover:text-white transition-colors">
                  Hombre
                </Link>
              </li>
              <li>
                <Link to="/productos?categoria=Mujer" className="text-gray-400 hover:text-white transition-colors">
                  Mujer
                </Link>
              </li>
              <li>
                <Link to="/ar/featured" className="text-gray-400 hover:text-white transition-colors">
                  AR Experience
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-light mb-4">Servicio al cliente</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/envios" className="text-gray-400 hover:text-white transition-colors">
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-light mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Av. Siempre Viva 123, Springfield</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+57 3243833378</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@omgel.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OMGEL STORE. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de privacidad
            </Link>
            <Link to="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;