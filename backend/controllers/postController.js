import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary} from "cloudinary";
import Notification from "../models/notificationModel.js";
export const createPost = async(req, res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;

        const userId = req.user.id.toString();

        const user = await User.findById(userId);

        if(!user) return res.status(404).json({error: "user not found"});

         if (!text && !img) {
            return res.status(404).json({error: "post must have a text or a image"});
         };
        
         if(img) {
           const uploadedResponse = await cloudinary.uploader.upload(img)
           img = uploadedResponse.secure_url
         }

         const newPost = new Post({
            user: userId,
            text,
            img
         })

         await newPost.save();

         return res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error: "Internal server error"}); 
        console.log("error in createpost", error.message)
    }
}



export const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(400).json({error: "Post not found"});
      }

      // check if the authenticated user owns the post

     if (post.user.toString() !== req.user.id.toString()) {
        res.status(400).json({error: "You are not authorized to delete this post"});
     };
    // if the post contained an image remove the image from cloudinary
     if(post.img)  {
         const imgId = post.img.split("/").pop().split(".")[0]
          await cloudinary.uploader.destroy(imgId);

     }


     await Post.findByIdAndDelete(req.params.id)


     return res.status(200).json({message: "post succesfuly deleted"});




    } catch (error) {
      console.log("error in delete post", error.message) 
      res.status(500).json({error: error.message}); 
    }
}






export const commentOnPost = async(req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user.id;

        if(!text) {
            return res.status(400).json({error: "comment text cant be empty"})
        }

        const post = await Post.findById(postId);

        if(!post) return res.status(400).json({error: "Post not found"});

        const comment = {user: userId, text}

        post.comments.push(comment);

        await post.save();

        res.status(200).json(post)
    } catch (error) {
        console.log("error in comment on post", error.message) ;
        res.status(500).json({error: error.message});  
    }
};



export const likeUnLikePost = async(req, res) => {

    try {
        const userId = req.user.id;
        const{id: postId} = req.params;
    
        const post = await Post.findById(postId);
    
        if(!post) {
            return res.status(400).json({error: "Post not found"})
        }
          // check if user liked the post already
        const userLikePost = post.likes.includes(userId);
    
        if (userLikePost) {
            // we remove the like from the post by removing from the array
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            await User.updateOne({_id: userId}, {$pull: {likedPosts: postId}});
    
            res.status(200).json({message: "post like removed"});
        }  else {
              // we add  the like to the post by adding the userId to the array
              await Post.updateOne({_id: postId}, {$push: {likes: userId}});
              // add the post to the liked post array
              await User.updateOne({_id: userId}, {$push: {likedPosts: postId}});

              const newNotification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
              });

              await newNotification.save();
    
              res.status(200).json({message: "post liked succesfuly"});
        }
    } catch (error) {
        console.log("error in like controller", error.message) 
      res.status(500).json({error: error.message})
    }
   
}


 export const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        }); // .populate allows to get the owner of the post details also.
    

        if (posts.length === 0)  {
            res.status(200).json([])
        }

        res.status(200).json(posts);
    } catch (error) {
        console.log("error in getAllposts controller", error.message) 
        res.status(500).json({error: error.message})
    }
 }