const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Thêm tên"],
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    default: "SKU",
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Thêm sản phẩm"],
    trim: true,
  },
  brand: {
    type: String, // Chỉnh lại kiểu dữ liệu thành String
    required: [true, "Thêm thương hiệu"],
    trim: true,
  },
  color: {
    type: String,
    required: [true, "Thêm màu"],
    default: "As seen",
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Thêm số lượng"],
    trim: true,
  },
  sold: {
    type: Number,
    default: 0,
    trim: true,
  },
  regularPrice: {
    type: Number,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Thêm giá bán"],
    trim: true,
  },
  description: { // Sửa lỗi chính tả từ "desciption" thành "description"
    type: String,
    required: [true, "Thêm mô tả"],
    trim: true,
  },
  image: {
    type: [String],
  },
  ratings: {
    type: [Object],
  },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
