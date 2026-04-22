import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Logistics = () => {
  const [data, setData] = useState({ stores: [], shipping: [] });

  useEffect(() => {
    axios.get(`${API_URL}/logistics/metrics`).then((res) => setData(res.data));
  }, []);

  // Map month numbers back to names for the chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedShipping = data.shipping.map((item) => ({
    month: monthNames[item._id.month - 1],
    cost: item.avgShipping,
  }));

  return (
    <div className="dashboard-container">
      <h1>Logistics & Fulfillment</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Order Volume by Store Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.stores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" name="Total Orders" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Average Shipping Cost Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedShipping}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(val) => `$${val}`} />
              <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
              <Line
                type="monotone"
                dataKey="cost"
                name="Avg Cost"
                stroke="#06B6D4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Logistics;
