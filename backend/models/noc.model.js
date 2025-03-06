const mongoose = require('mongoose');

const NOCSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },

  buildingType: { type: String, required: true },
  propertySize: { type: String, required: true },
  hasFireSafety: { type: Boolean, required: true },
  extinguishers: { type: Number, default: 0 },
  smokeDetectors: { type: Boolean, default: false },
  waterSprinklers: { type: Boolean, default: false },

  aadhaarCard: { type: String, required: true },
  panCard: { type: String, required: true },
  fireSafetyCert: { type: String },
  applicationId: { type: String, unique: true },
  declaration: { type: Boolean, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('NOC', NOCSchema);
