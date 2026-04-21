const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  Date: Date,
  Region: String,
  Product: String,
  Quantity: Number,
  UnitPrice: Number,
  StoreLocation: String,
  CustomerType: String,
  Discount: Number,
  Salesperson: String,
  TotalPrice: Number,
  PaymentMethod: String,
  Promotion: String,
  Returned: Number,
  OrderID: String,
  CustomerName: String,
  ShippingCost: Number,
  OrderDate: Date,
  DeliveryDate: Date,
  RegionManager: String
}, { collection: 'sales' }); // Assuming the collection in Atlas is named 'sales'

module.exports = mongoose.model('Sale', saleSchema);