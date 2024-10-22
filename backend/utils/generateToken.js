import jwt from "jsonwebtoken";

function generateAccessToken(user) {
	const payload = {
	  id: user._id,
	 
	};
	
	const secret = process.env.JWT_SECRET;
	const options = { expiresIn: '2h' };
  
	return jwt.sign(payload, secret, options);
  }
export default generateAccessToken;