const notificationService = require("../services/notification.service");
const { sendSuccess } = require("../utils/response");

const getMyNotifications = async(req,res,next)=>{
    try{
        const notifications = await notificationService.getMyNotifications(req.user._id);
        return sendSuccess(
            res,
            200,
            "Notifications fetched successfully",
            notifications

        );
    }catch(error){
        next(error);
    }
}

const markAsRead = async(req,res,next) => {
    try{
        const notification = await notificationService.markAsRead(
            req.params.id,
            req.user._id
        );
        return sendSuccess(
            res,
            200,
            "Notification marked as read",
            notification
        );
    }
    catch(error){
        next(error);
    }
};

module.exports = {
    getMyNotifications,
    markAsRead
};