import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, BarChart } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-light mb-8">Panel de Administración</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64">
            <nav className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Link
                to="/admin"
                className={`flex items-center px-4 py-3 ${
                  isActive('/admin') 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Package size={20} className="mr-3" />
                Productos
              </Link>
              <Link
                to="/admin/pedidos"
                className={`flex items-center px-4 py-3 ${
                  isActive('/admin/pedidos') 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <ShoppingBag size={20} className="mr-3" />
                Pedidos
              </Link>
              <Link
                to="/admin/reportes"
                className={`flex items-center px-4 py-3 ${
                  isActive('/admin/reportes') 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <BarChart size={20} className="mr-3" />
                Reportes
              </Link>
            </nav>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;