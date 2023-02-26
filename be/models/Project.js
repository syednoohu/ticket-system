const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: true,
  },
  companyCode: {
    type: String,
    required: true,
  },
  serviceFrom: { type: Date, required: true },
  serviceTo: { type: Date, required: true },
  location:[String],
  serialNos:[String],
  isActive: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Project", ProjectSchema);
