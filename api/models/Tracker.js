const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HistorySchema = require("./History");

const InjurySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  complete: {
    type: Boolean,
    default: false,
  },
  symptoms: {
    type: String,
    required: false,
    default: "N",
  },
  history: [HistorySchema],
  time: {
    type: Date,
    default: Date.now,
  },
});

const Injury = mongoose.model("Injury", InjurySchema);

module.exports = Injury;
