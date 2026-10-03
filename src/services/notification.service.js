const Notification = require("../models/notification.model");
const createNotification  = async({
    recipient,
    type,
    title,
    message,
    relatedResource
}) => {
    const notification = await Notification.create({
        recipient,
        type,
        title,
        message,
        relatedResource
    });
    return notification;
};

const getMyNotifications = async(userId) => {
    const notifications = await Notification.find({
        recipient: userId
    })
        .sort({ createdAt: -1 });
    return notifications;
}

const markAsRead = async (notificationId, userID) => {
    const notification = await Notification.findOne({
        _id: notificationId,
        recipient: userId
    });

    if(!notification){
        const error = new Error("Notification not found");
        error.statusCode = 404;
        throw error;
    }
    notification.isRead = true;
    await notification.save();
    return notification;
};

module.exports = {
    createNotification,
    getMyNotifications,
    markAsRead
};