const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyCode: {
    type: String,
    default: "",
  },
  phone: String,
  fax: String,
  contact: String,
  email: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  address: String,
  country: String,
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
