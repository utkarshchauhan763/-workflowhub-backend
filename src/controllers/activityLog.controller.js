const activityLogService = require("../services/activityLog.service");
const { sendSuccess } = require("../utils/response");

const getActivityLogs = async(req,res,next) => {
    try{
        const logs = await activityLogService.getActivityLogs();
        return sendSuccess(
            res,
            200,
            "Activity logs fetched successfully",
            logs
        );
    }
    catch(error){
        next(error);
    }
};
module.exports = { getActivityLogs };