import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowLeft, MapIcon as WhatsappIcon } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! Me gustaría obtener más información sobre los siguientes productos:\n\n${cartItems
        .map(item => `${item.product.name} - Talla: ${item.size} - Cantidad: ${item.quantity}`)
        .join('\n')
      }\n\nTotal: $${totalPrice.toFixed(2)}`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
            <Link
              to="/productos"
              className="inline-flex items-center text-black hover:text-gray-700"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-light mb-8">Carrito de compra</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="p-6 border-b last:border-b-0">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-light">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">Talla: {item.size}</p>
                      <p className="text-black mt-1">${item.product.price.toFixed(2)}</p>

                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex border border-gray-300">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-light mb-4">Resumen de compra</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="https://checkout.stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors"
                >
                  Proceder al pago
                </a>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full border border-green-600 text-green-600 py-3 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                >
                  <WhatsappIcon size={20} className="mr-2" />
                  Consultar con un asesor
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Pago seguro con Stripe. Tus datos están protegidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;