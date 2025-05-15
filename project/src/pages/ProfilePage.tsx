import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { LogOut, User, ShoppingBag, Heart, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';

interface UserProfile {
  displayName: string;
  email: string;
  createdAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  wishlist?: string[];
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
  createdAt: any;
}

const ProfilePage: React.FC = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [savingAddress, setSavingAddress] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && !isAdmin) {
      setActiveTab(tabParam);
    }
  }, [isAdmin]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        setLoadingProfile(true);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserProfile;
          setProfile(userData);
          if (userData.shippingAddress) {
            setAddressForm(userData.shippingAddress);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || isAdmin) {
      setLoadingOrders(false);
      return;
    }

    setLoadingOrders(true);
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setOrders(ordersData);
      setLoadingOrders(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, [currentUser, isAdmin]);

  useEffect(() => {
    if (!currentUser || !profile?.wishlist || profile.wishlist.length === 0 || isAdmin) {
      setLoadingWishlist(false);
      return;
    }

    const fetchWishlistProducts = async () => {
      setLoadingWishlist(true);
      try {
        const products = await Promise.all(
          profile?.wishlist?.map(async (productId) => {
            const docRef = doc(db, 'products', productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              return { id: docSnap.id, ...docSnap.data() } as Product;
            }
            return null;
          }) ?? []
        );
        setWishlistProducts(products.filter((p): p is Product => p !== null));
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchWishlistProducts();
  }, [currentUser, profile?.wishlist, isAdmin]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setSavingAddress(true);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        shippingAddress: addressForm
      });
      
      setProfile(prev => prev ? {
        ...prev,
        shippingAddress: addressForm
      } : null);
      
      setIsEditingAddress(false);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Error al guardar la dirección. Por favor intenta de nuevo.');
    } finally {
      setSavingAddress(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newWishlist = (profile?.wishlist ?? []).filter(id => id !== productId);
      await updateDoc(userRef, { wishlist: newWishlist });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loadingProfile) {
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
            
            {!isAdmin && (
              <>
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
              </>
            )}
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
              
              {!isAdmin && (
                <div className="bg-white border border-gray-200 p-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Dirección de envío</h2>
                    {profile?.shippingAddress && !isEditingAddress && (
                      <button 
                        onClick={() => setIsEditingAddress(true)}
                        className="text-sm text-black hover:text-gray-700"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                  
                  {isEditingAddress || !profile?.shippingAddress ? (
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Calle y número
                        </label>
                        <input
                          type="text"
                          value={addressForm.street}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estado/Provincia
                        </label>
                        <input
                          type="text"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código postal
                        </label>
                        <input
                          type="text"
                          value={addressForm.zipCode}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, zipCode: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          País
                        </label>
                        <input
                          type="text"
                          value={addressForm.country}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={savingAddress}
                          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {savingAddress ? 'Guardando...' : 'Guardar dirección'}
                        </button>
                        {profile?.shippingAddress && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingAddress(false);
                              setAddressForm(profile.shippingAddress!);
                            }}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      <p>{profile.shippingAddress.street}</p>
                      <p>{profile.shippingAddress.city}, {profile.shippingAddress.state}</p>
                      <p>{profile.shippingAddress.zipCode}</p>
                      <p>{profile.shippingAddress.country}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {!isAdmin && activeTab === 'orders' && (
            <div>
              <h1 className="text-2xl font-light mb-6">Mis pedidos</h1>
              {loadingOrders ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-500">
                            {format(order.createdAt.toDate(), "d 'de' MMMM, yyyy", { locale: es })}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between py-2">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                Cantidad: {item.quantity} · Talla: {item.size}
                              </p>
                            </div>
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 -mx-6 px-6 pt-4">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Total</p>
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-6">
                  <p className="text-gray-600">
                    No has realizado ningún pedido todavía.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!isAdmin && activeTab === 'wishlist' && (
            <div>
              <h1 className="text-2xl font-light mb-6">Mis favoritos</h1>
              {loadingWishlist ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <Link to={`/productos/${product.id}`} className="block">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-light">{product.name}</h3>
                            <p className="text-gray-900">${product.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <Link 
                          to={`/productos/${product.id}`}
                          className="mt-4 block text-center bg-black text-white py-2 hover:bg-gray-800 transition-colors"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-6 text-center">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Aún no has añadido ningún producto a favoritos.
                  </p>
                  <Link 
                    to="/productos"
                    className="inline-block bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                  >
                    Explorar productos
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

