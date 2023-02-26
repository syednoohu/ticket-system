const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  shopCode: {
    type: String,
    default: "",
  },
  shopName: {
    type: String,
    required: true,
  },
  companyCode: {
    type: String,
    default: "",
  },
  contact: String,
  phone: String,
  fax: String,
  email: {
    type: String,
    default: "",
  },
  address: String,
  country: String,
  isActive: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Shops", ShopSchema);
