const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Interest", interestSchema);
