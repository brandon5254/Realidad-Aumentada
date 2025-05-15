import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { collection, query, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Order } from '../../types/order';

interface SalesData {
  totalSales: number;
  monthlyGrowth: number;
  topProducts: Array<{
    name: string;
    quantity: number;
  }>;
  monthlySales: {
    [key: string]: number;
  };
}

const AdminReports = () => {
  const [salesData, setSalesData] = useState<SalesData>({
    totalSales: 0,
    monthlyGrowth: 0,
    topProducts: [],
    monthlySales: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query for orders in the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const q = query(
      collection(db, 'orders'),
      where('createdAt', '>=', Timestamp.fromDate(sixMonthsAgo))
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      // Calculate total sales
      const total = orders.reduce((sum, order) => sum + order.total, 0);

      // Calculate monthly sales
      const monthly: { [key: string]: number } = {};
      orders.forEach(order => {
        const date = new Date(order.createdAt.toDate());
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        monthly[monthKey] = (monthly[monthKey] || 0) + order.total;
      });

      // Calculate monthly growth
      const monthKeys = Object.keys(monthly).sort();
      let growth = 0;
      if (monthKeys.length >= 2) {
        const currentMonth = monthly[monthKeys[monthKeys.length - 1]];
        const previousMonth = monthly[monthKeys[monthKeys.length - 2]];
        growth = ((currentMonth - previousMonth) / previousMonth) * 100;
      }

      // Calculate top products
      const productCounts: { [key: string]: { name: string; quantity: number } } = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          // Use a fallback name if item.name does not exist
          const productName = (item as any).name || item.productId;
          if (!productCounts[item.productId]) {
            productCounts[item.productId] = {
              name: productName,
              quantity: 0
            };
          }
          productCounts[item.productId].quantity += item.quantity;
        });
      });

      const topProducts = Object.values(productCounts)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 3);

      setSalesData({
        totalSales: total,
        monthlyGrowth: growth,
        topProducts,
        monthlySales: monthly
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('es', { month: 'short' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reportes y Análisis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ventas Totales */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ventas Totales</h3>
            <DollarSign className={`text-${salesData.monthlyGrowth >= 0 ? 'green' : 'red'}-500`} />
          </div>
          <p className="text-3xl font-bold">${salesData.totalSales.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {salesData.monthlyGrowth >= 0 ? '+' : ''}{salesData.monthlyGrowth.toFixed(1)}% vs mes anterior
          </p>
        </div>

        {/* Productos Más Vendidos */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Productos Top</h3>
            <TrendingUp className="text-blue-500" />
          </div>
          <ul className="space-y-2">
            {salesData.topProducts.map((product, index) => (
              <li key={index} className="flex justify-between">
                <span>{product.name}</span>
                <span className="font-semibold">{product.quantity} unidades</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Análisis de Ventas */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Análisis Mensual</h3>
            <BarChart3 className="text-purple-500" />
          </div>
          <div className="h-40 flex items-end justify-between gap-2">
            {Object.entries(salesData.monthlySales)
              .sort(([a], [b]) => a.localeCompare(b))
              .slice(-6)
              .map(([monthKey, value], index) => {
                const maxValue = Math.max(...Object.values(salesData.monthlySales));
                const height = (value / maxValue) * 100;
                return (
                  <div key={monthKey} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-purple-200 w-full rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {getMonthName(monthKey)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;