const mongoose = require("mongoose");

const inspectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availability: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
  expertise: { type: String, required: true },
});

module.exports = mongoose.model("Inspector", inspectorSchema);