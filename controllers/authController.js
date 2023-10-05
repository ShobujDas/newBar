const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const JWT = require('jsonwebtoken');


exports.registerController = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ messager: "Password is Required" });
    }
   

    //check user
    const existingUser = await User.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword);
    //save
    const user = await User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // const user = "fdf";

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error is Registretion",
      error,
    });
  }
};


//LOGIN || POST
exports.loginController = async(req,res)=>{
  try {

    const {email,password} = req.body;
    //validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:'Invalid email and password'
      })
    }
    //check user
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        message:'Email is not register'
      })
    }
    const match = await comparePassword(password,user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message:"Invalid Password"
      })
    }

    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECREAT,{expiresIn:'7d'});

    res.status(200).send({
      success:true,
      message:'login successfully',
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        role:user.role,
      },
      token,
    })


    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error is login",
      error,
    });
  }
}

//forgotPasswordController

exports.forgotPasswordController = async(req,res) =>{
  try {
    const {email,answer,newPassword} = req.body;
    if(!email){
      res.status(400).send({message:"Email is required"})
    }
    if(!answer){
      res.status(400).send({message:"answer is required"})
    }
    if(!newPassword){
      res.status(400).send({message:"newPassword is required"})
    }

    //check
    const user = await User.findOne({email,answer});
    //validation
    if(!user){
      return res.status(404).send({
        success:false,
        message:'Wrong Email or Answer'
      })
    }

    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success:true,
      message:'password Reset Successfully',
    })


    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
    
  }
}


exports.testController = async(req,res)=>{
  res.send("Protected Route")
}

exports.adminController = async(req,res)=>{
  res.send("Protected Route")
}

// module.exports = registerController;
