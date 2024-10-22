  import User from "../models/userModel.js";
  import bcrypt from "bcryptjs";
  import generateAccessToken from "../utils/generateToken.js";


export const signup = async(req, res) => {
  try {
   const {username, fullName, email, password} = req.body;
    
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!email.match(emailRegex)) {
      return res.status(400).json({
         error: "Invalid email format"
      })
   };

      const existingUser = await User.findOne({username});

      if (existingUser) {
         return res.status(400).json({
            error: "username is already  taken"
         })
      };

      const existingEmail = await User.findOne({email});

      if (existingEmail) {
         return res.status(400).json({
            error: "email is already  taken"
         })
      };

      if (password.length < 6)  {
         return res.status(400).json({
            error: "Password must be at least 6 characters"
         })
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);


      const newUser = new User({
         fullName,
         email,
         username,
         password: hashedPassword
      });

      if(newUser) {
       const token =     generateAccessToken(newUser._id);
         await newUser.save();

         return res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            username: newUser.username,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
            token: token
         })
      } else {
         res.status(400).json({
            error: "Invalid user data"
         })
      }

   }

   catch (error) {
     console.log( "Error in signup controller",error.message)
     res.status(500).json({
    error:  "Internal server error"
     })
  }

} 


export const login = async(req, res) => {
   try {

      const {username, password} = req.body;

      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password, user.password || "")

      if (!user || !isPasswordCorrect) {
         res.status(400).json({error: "Invalid username or password"})
      };
      
      const token = generateAccessToken(user._id);

      return res.status(200).json({
         id: user._id,
         fullName: user.fullName,
         email: user.email,
         username: user.username,
         followers: user.followers,
         following: user.following,
         profileImg: user.profileImg,
         coverImg: user.coverImg,
         token: token


      })


   } catch (error) {
      console.log( "Error in login controller",error.message)
     res.status(500).json({
    error:  "Internal server error"
     })
   }
 };


 export const logout = async(req, res) => {
   try {
      res.status(200).json({
         message: " successfuly logged out"
        })
   } catch (error) {
      console.log( "Error in logout controller",error.message)
      res.status(500).json({
     error:  "Internal server error"
      })
   }

    // since jwt package doesnt have a method to remove on the server side the logout will be done on the client side//
    
 };

 export const getMe = async(req, res) => {

  try {
   const user = await User.findById(req.user.id).select("-password");
   res.status(200).json(user)
  } catch (error) {
   console.log( "Error in getMe controller",error.message)
   res.status(500).json({
  error:  "Internal server error"
   })
  }

 }