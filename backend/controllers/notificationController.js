const Notification = require("../models/Notification");

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ time: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};
exports.createNotifications = async (req, res) => {
    const payload = req.body;
    try {
        const notifications = new Notification(payload)
        await notifications.save()
        res.status(200).json("created success");
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({}, { read: true });
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error marking notifications as read", error: error.message });
    }
};