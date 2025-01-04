import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import jwt from 'jsonwebtoken';
import BlacklistingToken from "../models/blacklistingToken.model.js";

async function authUser(req,res,next){
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   if(!token){
      return res.status(401).json({error: 'Unauthorized'});
   }
   const isBalckListed = await BlacklistingToken.findOne({token: token})
    if(isBalckListed){
      return res.status(401).json({error: 'Unauthorized'});
    }
   try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded._id);

    if(!user){
       return res.status(401).json({error: 'Unauthorized'});
    }
    req.user = user;
    next();
    
   } catch (error) {
      res.status(403).json({error: 'Unauthorized'});
   }
}
async function authCap(req,res,next){
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   if(!token){
      return res.status(401).json({error: 'Unauthorized because of invalid token'});
   }
   const isBalckListed = await BlacklistingToken.findOne({token: token})
    if(isBalckListed){
      return res.status(401).json({error: 'Unauthorized'});
    }
   try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
   const cap = await Captain.findById(decoded._id);
    if(!cap){
       return res.status(401).json({error: 'Unauthorized'});
    }
    req.cap = cap;
   return next();
    
   } catch (error) {
      res.status(403).json({error: 'Unauthorized'});
   }
}

export { authUser,authCap }