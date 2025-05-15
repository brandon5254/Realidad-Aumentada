import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const isHomePage = location.pathname === '/';
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage || isSearchOpen
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-light tracking-wider">
            ELEGANCE
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-gray-400 transition-colors">
              Inicio
            </Link>
            <Link to="/productos" className="hover:text-gray-400 transition-colors">
              Productos
            </Link>
            <Link to="/sobre-nosotros" className="hover:text-gray-400 transition-colors">
              Sobre nosotros
            </Link>
            <Link to="/ar/featured" className="hover:text-gray-400 transition-colors">
              AR Experience
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleSearch}
              className="hover:text-gray-400 transition-colors"
              aria-label="Buscar"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <Link to={currentUser ? "/perfil" : "/login"} className="hover:text-gray-400 transition-colors">
              <User size={20} />
            </Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-gray-400 transition-colors">
                Admin
              </Link>
            )}
            <Link to="/carrito" className="hover:text-gray-400 transition-colors relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              id="search-input"
              type="search"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-900 absolute top-full left-0 w-full">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="py-2 hover:text-gray-400 transition-colors">
                Inicio
              </Link>
              <Link to="/productos" className="py-2 hover:text-gray-400 transition-colors">
                Productos
              </Link>
              <Link to="/sobre-nosotros" className="py-2 hover:text-gray-400 transition-colors">
                Sobre nosotros
              </Link>
              <Link to="/ar/featured" className="py-2 hover:text-gray-400 transition-colors">
                AR Experience
              </Link>
              {isAdmin && (
                <Link to="/admin" className="py-2 hover:text-gray-400 transition-colors">
                  Admin
                </Link>
              )}
              <div className="flex space-x-6 py-2">
                <Link to={currentUser ? "/perfil" : "/login"} className="hover:text-gray-400 transition-colors">
                  <User size={20} />
                </Link>
                <Link to="/carrito" className="hover:text-gray-400 transition-colors relative">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;