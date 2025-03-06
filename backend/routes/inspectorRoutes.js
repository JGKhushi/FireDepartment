const express = require("express");
const router = express.Router();
const inspectorController = require("../controllers/inspectorController");

router.get("/", inspectorController.getAllInspectors);

module.exports = router;