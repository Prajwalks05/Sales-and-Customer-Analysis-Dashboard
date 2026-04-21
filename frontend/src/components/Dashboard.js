import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalCustomers: 0, averageOrderValue: 0 });
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sumRes = await axios.get(`${API_URL}/analytics/summary`);
      setSummary(sumRes.data);

      const monthRes = await axios.get(`${API_URL}/analytics/monthly-sales`);
      setMonthlySales(monthRes.data);

      const prodRes = await axios.get(`${API_URL}/analytics/top-products`);
      setTopProducts(prodRes.data);

      const recRes = await axios.get(`${API_URL}/sales/recent`);
      setRecentSales(recRes.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sales & Customer Analytics</h1>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}><h3>Total Revenue</h3><p>${summary.totalRevenue.toFixed(2)}</p></div>
        <div style={cardStyle}><h3>Orders</h3><p>{summary.totalOrders}</p></div>
        <div style={cardStyle}><h3>Customers</h3><p>{summary.totalCustomers}</p></div>
        <div style={cardStyle}><h3>AOV</h3><p>${summary.averageOrderValue.toFixed(2)}</p></div>
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <div style={{ flex: 1, height: 300 }}>
          <h3>Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, height: 300 }}>
          <h3>Top Products by Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sales Table */}
      <h3>Recent Sales</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {recentSales.map(sale => (
            <tr key={sale._id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{sale.OrderID}</td>
              <td>{new Date(sale.OrderDate).toLocaleDateString()}</td>
              <td>{sale.CustomerName}</td>
              <td>{sale.Product}</td>
              <td>${sale.TotalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cardStyle = {
  flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', textAlign: 'center'
};

export default Dashboard;