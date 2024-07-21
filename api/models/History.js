const mongoose = require("mongoose");
const HistorySchema = new mongoose.Schema({
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  symptoms: [
    {
      type: String,
    },
  ],
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = HistorySchema;
