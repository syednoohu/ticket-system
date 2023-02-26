const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CustomerSchema = new mongoose.Schema({
  lineNumber: Number,
  clientId: {
    type: String,
    default: "",
  },
  address: String,
  clientFullName: {
    type: String,
    unique: true,
    required: true,
  },
  district: String,
  phone: {
    type: String,
    default: "",
  },
  staffs: {
    type: [String],
    default: [],
  },
  taxId: {
    type: String,
    default: "",
  },
  postalCode: {
    type: String,
    default: "",
  },
  fax: String,
  contactPerson: String,
  clientBank: {
    type: String,
    default: "",
  },
  creditLimit: {
    type: Number,
    default: 0,
  },
  clientPaymentDate: {
    type: Number,
    default: 0,
  },
  monthlyPaymentDate: {
    type: Number,
    default: 0,
  },
  bankAccount: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  contactPersonIdentityId: {
    type: String,
    default: "",
  },
  taxRegisterNumber: {
    type: String,
    default: "",
  },
  defaultSalesPrice: {
    type: String,
    default: "本客戶最新售價",
  },
  settlementUnit: String,
  clientUse8: {
    type: String,
    default: "",
  },
  isInActive: {
    type: Boolean,
    default: false,
  },
  // ==========================================
  docCreatedBy: String,
  docCreatedDate: {
    type: Date,
    default: () => Date.now(),
  },
  modifiedBy: String,
  modifiedDate: {
    type: Date,
    default: () => Date.now(),
  },
  user_id: mongoose.Types.ObjectId,
  discountFactor: {
    type: Number,
    default: 0,
  },
  isNo5Charge: {
    type: Boolean, // if true not charge
    default: false,
  },
  underTeam: String,
});

CustomerSchema.index({ clientFullName: "text" });

CustomerSchema.plugin(AutoIncrement, { inc_field: "lineNumber" });

module.exports = mongoose.model("Customers", CustomerSchema);
