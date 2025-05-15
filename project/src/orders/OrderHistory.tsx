import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Order } from '../types/order';
import { Package } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'En proceso';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tienes pedidos todavía
        </h3>
        <p className="text-gray-500">
          Cuando realices una compra, podrás ver el estado de tus pedidos aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div className="border-t border-gray-200 -mx-6 px-6 py-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between py-2">
                  <div>
                    <p className="font-medium">{item.productId}</p>
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
              
              {order.estimatedDeliveryDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Entrega estimada: {format(new Date(order.estimatedDeliveryDate), "d 'de' MMMM, yyyy", { locale: es })}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;