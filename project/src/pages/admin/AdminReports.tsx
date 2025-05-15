import React from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reportes y Análisis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ventas Totales */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ventas Totales</h3>
            <DollarSign className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">$24,500</p>
          <p className="text-sm text-gray-500 mt-2">+12% vs mes anterior</p>
        </div>

        {/* Productos Más Vendidos */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Productos Top</h3>
            <TrendingUp className="text-blue-500" />
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Producto A</span>
              <span className="font-semibold">145 unidades</span>
            </li>
            <li className="flex justify-between">
              <span>Producto B</span>
              <span className="font-semibold">98 unidades</span>
            </li>
            <li className="flex justify-between">
              <span>Producto C</span>
              <span className="font-semibold">76 unidades</span>
            </li>
          </ul>
        </div>

        {/* Análisis de Ventas */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Análisis Mensual</h3>
            <BarChart3 className="text-purple-500" />
          </div>
          <div className="h-40 flex items-end justify-between gap-2">
            {[65, 45, 75, 55, 85, 35].map((height, index) => (
              <div
                key={index}
                className="bg-purple-200 w-full rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Ene</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;