const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
// const 
router.post("/create",notificationController.createNotifications)
router.get("/", notificationController.getAllNotifications);
router.put("/mark-all-read", notificationController.markAllAsRead);

module.exports = router;