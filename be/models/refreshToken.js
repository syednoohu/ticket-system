const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("RTSchema", TokenSchema);
