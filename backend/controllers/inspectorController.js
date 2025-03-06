const Inspector = require("../models/Inspector");

// Get all inspectors
exports.getAllInspectors = async (req, res) => {
  try {
    const inspectors = await Inspector.find();
    res.status(200).json(inspectors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inspectors", error: error.message });
  }
};

