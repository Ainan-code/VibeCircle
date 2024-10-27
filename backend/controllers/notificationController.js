import Notification from "../models/notificationModel.js";



export const getNotifications = async(req, res) => {
  try {

    const userId  = req.user.id;

    const notifications = await Notification.find({to: userId}).populate({
        path: "from",
        select: "username profileImg"
    });

    await Notification.updateMany({to: userId}, {read: true});

   return res.status(200).json(notifications)
    
  } catch (error) {
    console.log("error in getNotificaiton controller", error.message);
     res.status(500).json({error: "Internal server error"});

  }
}




export const deleteNotifications = async(req, res) => {
    try {
        const userId  = req.user.id;

        await Notification.deleteMany({to:userId});

        return res.status(200).json({message: "notifications deleted succesfuly"});
    } catch (error) {
        console.log("error in deletenotification controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
  }
