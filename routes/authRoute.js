const express = require("express");
const {registerController,loginController, testController, forgotPasswordController} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");


//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", registerController);

//REGISTER || METHOD POST
router.post("/login", loginController);



//Forgot password || METHOD POST
router.post("/forgot-password", forgotPasswordController);

//Test || METHOD GET
router.get("/test", requireSignIn,isAdmin,testController);
// router.get("/admin", isAdmin,adminController);


//Protected User Route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
   res.status(200).send({ok:true});
})



//Protected admin Route auth 
router.get('/admin-auth',requireSignIn,(req,res)=>{
   res.status(200).send({ok:true});
})


module.exports = router;
