import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Team = () => {
  const [data, setData] = useState({ leaderboard: [], regions: [] });

  useEffect(() => {
    axios.get(`${API_URL}/team/metrics`).then((res) => setData(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Sales Team Performance</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Top Salespersons by Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.leaderboard}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis tickFormatter={(val) => `$${val}`} />
              <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Revenue by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.regions}
                dataKey="revenue"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.regions.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Team;
