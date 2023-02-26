const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  contractName: {
    type: String,
    required: true,
  },
  contractCode: {
    type: String,
    default: "",
  },
  contractFrom: { type: Date, required: true },
  contractTo: { type: Date, required: true },
  location:[String],
  serialNos:[String],
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Contract", ContractSchema);
