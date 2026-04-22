import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const Customers = () => {
  const [data, setData] = useState({ types: [], payments: [] });

  useEffect(() => {
    axios.get(`${API_URL}/customers/metrics`).then((res) => setData(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Customer Insights</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue: Retail vs Wholesale</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.types}
                dataKey="revenue"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.types.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Popular Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.payments} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="_id" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" name="Transactions" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Customers;
