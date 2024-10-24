import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary} from "cloudinary";


export const getUserProfile = async(req, res) => {
     const {username} = req.body;

     try {
        const user = await User.findOne({username}).select("-password");

        if (!user)  {
            res.status(400).json({error: "User not found"});
        }

        return res.status(200).json(user);
     } catch (error) {
        console.log("error in getuserprofile", error.message)
        res.status(500).json({error: error.message});

     }
};


export const followUnfollowUser = async(req, res) => {
    
   try {
    
     const { id} = req.params;
     const userToModify = await User.findById(id);
     const currentUser = await User.findById(req.user.id);


     if ( id === req.user.id.toString()) {
        res.status(500).json({error: "You cant follow or unfollow yourself"});

     }

     if (!userToModify || !currentUser) {
        res.status(500).json({error: "users not found"});
     }

     const isFollowing = currentUser.following.includes(id); // check if the current user is already following the targetuser
     const isFollowed = userToModify.followers.includes(req.user.id); // check if the current user is in the followers of target user

     if(isFollowing && isFollowed) {
        // unfollow the user in that case
        await User.findByIdAndUpdate(id, {$pull : {followers: req.user.id}});
        await User.findByIdAndUpdate(req.user.id, {$pull : {following: id}});
        res.status(200).json({message: "user unfollowed successfuly"})
     } else {
        // follow the user
        await User.findByIdAndUpdate(id, {$push : {followers: req.user.id}});
        await User.findByIdAndUpdate(req.user.id, {$push : {following: id}});

        const newNotification = new Notification({
            from: req.user.id,
            to: id,
            type: "follow"
        })

        await newNotification.save();

        res.status(200).json({message: "user followed successfuly"});
     }

   } catch (error) {
    console.log("error in followunfollow controller", error.message)
    res.status(500).json({error: error.message});
   }
}





export const getSuggestedUsers = async(req, res) => {
      
    try {
        const userId = req.user.id;
        const userFollowedbyCurrentUser = await User.findById(userId).select("following");

        const users  = await User.aggregate([
            {
				$match: {
					_id: { $ne: userId },
				},
			},
			{ $sample: { size: 10 } },
        ]);


          // exclude from the users the ones followed already by the current user
        const filteredUsers = users.filter((user) =>   !userFollowedbyCurrentUser.following.includes(user._id));

        
        const suggestedUsers = filteredUsers.slice(0, 5);

        suggestedUsers.forEach((user) => (user.password = null) )

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("error in getsuggestedusers", error.message)
        res.status(500).json({error: error.message});
    }

}



export const updateUser = async(req, res) => {
   const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
	let { profileImg, coverImg } = req.body;

	const userId = req.user.id;

	try {
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profileImg) {
			if (user.profileImg) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

		if (coverImg) {
			if (user.coverImg) {
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);

   } catch (error) {
      console.log("error in update user controller:", error.message)
      return res.status(500).json({error: error.message})
   }


}