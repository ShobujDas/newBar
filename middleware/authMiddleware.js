const JWT = require('jsonwebtoken');
const User = require('../models/userModel');


//Protected Routes token base 
exports.requireSignIn = async(req,res,next)=>{
   try {
      const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECREAT)
      req.user = decode;
      next()
   } catch (error) {
      console.log(error)
      
   }
}


//admin access 
exports.isAdmin = async(req,res,next)=>{

   try {
      const user =await User.findById(req.user._id);
      if(user.role !== 1){
         return res.status(401).send({
            success:false,
            message:'UnAuthorized Access'
         })
      }else{
         next()
      }
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error in Admin middleware',
         error
      })
      
   }
}







