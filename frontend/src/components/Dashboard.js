import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalCustomers: 0, averageOrderValue: 0 });
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data in parallel for speed
        const [sumRes, monthRes, prodRes, recRes] = await Promise.all([
          axios.get(`${API_URL}/analytics/summary`),
          axios.get(`${API_URL}/analytics/monthly-sales`),
          axios.get(`${API_URL}/analytics/top-products`),
          axios.get(`${API_URL}/sales/recent`)
        ]);

        setSummary(sumRes.data);
        setMonthlySales(monthRes.data);
        setTopProducts(prodRes.data);
        setRecentSales(recRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading-screen">Loading Analytics Data...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sales & Customer Analytics Dashboard</h1>
      </header>

      {/* KPI Cards Section */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total Revenue</h3>
          <p className="kpi-value">${summary.totalRevenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="kpi-card">
          <h3>Total Orders</h3>
          <p className="kpi-value">{summary.totalOrders?.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <h3>Total Customers</h3>
          <p className="kpi-value">{summary.totalCustomers?.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <h3>Average Order Value</h3>
          <p className="kpi-value">${summary.averageOrderValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Sales Trend</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Top 5 Products by Revenue</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="table-container">
        <h3>Recent Transactions</h3>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Region</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.OrderID}</td>
                <td>{new Date(sale.OrderDate).toLocaleDateString()}</td>
                <td>{sale.CustomerName}</td>
                <td>{sale.Product}</td>
                <td>{sale.Region}</td>
                <td className="amount-cell">${sale.TotalPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;