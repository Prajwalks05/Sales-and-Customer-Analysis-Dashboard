const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Sale = require("./models/Sale");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch((err) => console.error(err));

// --- REST APIs ---

// 1. GET /api/analytics/summary
app.get("/api/analytics/summary", async (req, res) => {
  try {
    const summary = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$TotalPrice" },
          totalOrders: { $sum: 1 },
          uniqueCustomers: { $addToSet: "$CustomerName" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          totalCustomers: { $size: "$uniqueCustomers" },
          averageOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] },
        },
      },
    ]);
    res.json(
      summary[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        averageOrderValue: 0,
      },
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET /api/analytics/monthly-sales
app.get("/api/analytics/monthly-sales", async (req, res) => {
  try {
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          // Add $toDate to safely convert the CSV string into a real Date object
          _id: {
            year: { $year: { $toDate: "$OrderDate" } },
            month: { $month: { $toDate: "$OrderDate" } },
          },
          // Added $toDouble just in case the CSV imported prices as strings too!
          revenue: { $sum: { $toDouble: "$TotalPrice" } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          revenue: 1,
        },
      },
    ]);
    res.json(monthlySales);
  } catch (err) {
    console.error("Monthly sales error:", err); // This prints the exact error in your terminal
    res.status(500).json({ error: err.message });
  }
});

// 3. GET /api/analytics/top-products
app.get("/api/analytics/top-products", async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      { $group: { _id: "$Product", revenue: { $sum: "$TotalPrice" } } },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: "$_id", revenue: 1 } },
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET /api/analytics/top-customers
app.get("/api/analytics/top-customers", async (req, res) => {
  try {
    const topCustomers = await Sale.aggregate([
      { $group: { _id: "$CustomerName", volume: { $sum: "$TotalPrice" } } },
      { $sort: { volume: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: "$_id", volume: 1 } },
    ]);
    res.json(topCustomers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET /api/sales/recent
app.get("/api/sales/recent", async (req, res) => {
  try {
    const recent = await Sale.find().sort({ OrderDate: -1 }).limit(10);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- NEW MULTI-PAGE APIs ---

// 6. Team Page Data
app.get("/api/team/metrics", async (req, res) => {
  try {
    const leaderboard = await Sale.aggregate([
      {
        $group: {
          _id: "$Salesperson",
          revenue: { $sum: { $toDouble: "$TotalPrice" } },
          sales: { $sum: 1 },
        },
      },
      { $sort: { revenue: -1 } },
    ]);
    const regions = await Sale.aggregate([
      {
        $group: {
          _id: "$Region",
          revenue: { $sum: { $toDouble: "$TotalPrice" } },
        },
      },
    ]);
    res.json({ leaderboard, regions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Customer Page Data
app.get("/api/customers/metrics", async (req, res) => {
  try {
    const types = await Sale.aggregate([
      {
        $group: {
          _id: "$CustomerType",
          revenue: { $sum: { $toDouble: "$TotalPrice" } },
        },
      },
    ]);
    const payments = await Sale.aggregate([
      { $group: { _id: "$PaymentMethod", count: { $sum: 1 } } },
    ]);
    res.json({ types, payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Logistics Page Data
app.get("/api/logistics/metrics", async (req, res) => {
  try {
    const stores = await Sale.aggregate([
      { $group: { _id: "$StoreLocation", orders: { $sum: 1 } } },
    ]);
    const shipping = await Sale.aggregate([
      {
        $group: {
          _id: { month: { $month: { $toDate: "$OrderDate" } } },
          avgShipping: { $avg: { $toDouble: "$ShippingCost" } },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);
    res.json({ stores, shipping });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
