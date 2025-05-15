import React from 'react';
import { Truck, RotateCcw, Clock, CreditCard } from 'lucide-react';

const ShippingPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-2 text-center">Envíos y devoluciones</h1>
        <p className="text-gray-600 text-center mb-12">
          Información importante sobre nuestras políticas de envío y devolución
        </p>
        
        {/* Shipping Information */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-8">Envíos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Envío nacional</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <Clock className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Tiempo de entrega</p>
                    <p>3-5 días hábiles</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCard className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Costo</p>
                    <p>Gratis en compras superiores a $100</p>
                    <p>$10 en compras menores a $100</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Truck className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Cobertura</p>
                    <p>Envíos a todo el país</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Envío internacional</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <Clock className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Tiempo de entrega</p>
                    <p>7-14 días hábiles</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCard className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Costo</p>
                    <p>Calculado según destino y peso</p>
                    <p>Mostrado en el checkout</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Truck className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-black">Cobertura</p>
                    <p>Envíos a América y Europa</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Returns Information */}
        <div>
          <h2 className="text-2xl font-light mb-8">Devoluciones</h2>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="flex items-start mb-6">
              <RotateCcw className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium mb-2">Política de devoluciones</h3>
                <p className="text-gray-600">
                  Aceptamos devoluciones dentro de los 30 días posteriores a la compra. 
                  Los productos deben estar sin usar, con todas sus etiquetas originales 
                  y en su empaque original.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Proceso de devolución</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Inicia la devolución desde tu cuenta</li>
                  <li>Imprime la etiqueta de devolución</li>
                  <li>Empaca el producto en su empaque original</li>
                  <li>Envía el paquete usando la etiqueta proporcionada</li>
                  <li>Espera la confirmación de recepción</li>
                  <li>Recibe el reembolso en 3-5 días hábiles</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Condiciones</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>El producto debe estar sin usar</li>
                  <li>Debe incluir todas las etiquetas originales</li>
                  <li>Debe estar en su empaque original</li>
                  <li>No debe mostrar signos de uso o daño</li>
                  <li>Debe incluir todos los accesorios incluidos</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Excepciones</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Ropa desgastada</li>
                  <li>Productos en oferta o descuento especial</li>
                  <li>Productos personalizados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;