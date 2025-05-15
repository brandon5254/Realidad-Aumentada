import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { LogOut, User, ShoppingBag, Heart } from 'lucide-react';

interface UserProfile {
  displayName: string;
  email: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto py-8 md:py-16">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Sidebar Navigation */}
        <div className="md:w-64 mb-8 md:mb-0">
          <div className="p-4 bg-gray-50 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={24} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="font-medium">{profile?.displayName}</p>
                <p className="text-sm text-gray-500">{profile?.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-2 flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut size={18} className="mr-2" />
              Cerrar sesión
            </button>
          </div>
          
          <nav>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full text-left py-3 px-4 ${
                activeTab === 'profile' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <User size={18} className="mr-3" />
              Mi cuenta
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center w-full text-left py-3 px-4 ${
                activeTab === 'orders' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <ShoppingBag size={18} className="mr-3" />
              Mis pedidos
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center w-full text-left py-3 px-4 ${
                activeTab === 'wishlist' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <Heart size={18} className="mr-3" />
              Favoritos
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div>
              <h1 className="text-2xl font-light mb-6">Mi cuenta</h1>
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Información personal</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      defaultValue={profile?.displayName}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      defaultValue={profile?.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      El correo electrónico no se puede cambiar
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <button className="text-black hover:text-gray-700 text-sm">
                      Cambiar contraseña
                    </button>
                  </div>
                  <div className="pt-4">
                    <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 mt-6">
                <h2 className="text-lg font-medium mb-4">Dirección de envío</h2>
                <p className="text-gray-600 mb-4">
                  Aún no has añadido una dirección de envío
                </p>
                <button className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors">
                  Añadir dirección
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h1 className="text-2xl font-light mb-6">Mis pedidos</h1>
              <div className="bg-white border border-gray-200 p-6">
                <p className="text-gray-600">
                  No has realizado ningún pedido todavía.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div>
              <h1 className="text-2xl font-light mb-6">Mis favoritos</h1>
              <div className="bg-white border border-gray-200 p-6">
                <p className="text-gray-600">
                  Aún no has añadido ningún producto a favoritos.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;