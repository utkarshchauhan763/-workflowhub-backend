const ActivityLog = require("../models/activityLog.model");
const createActivityLog = async({
    user,
    action,
    resource,
    resourceId,
    details
}) => {
    const activityLog = await ActivityLog.create({
        user,action,resource,resourceId,details
    });
    return activityLog;
};

const getActivityLogs = async() => {
    const logs = await ActivityLog.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    return logs;
}

module.exports = { createActivityLog,getActivityLogs };