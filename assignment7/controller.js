const userModel=require("./model").userModel;
const bcrypt=require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');


exports.signUp = async(req,res) => {
    
    try{
      
    if (!req.body.name){
        res.send("Name cannot be empty");
    } else if (!req.body.email){
        res.send("Email cannot be empty");
    } else if (!req.body.branch){
        res.send("Branch cannot be empty");
    }else if(!req.body.password){
        res.send("Password cannot be empty");
    } else{
        let isDuplicateEmail = await userModel.findOne({email:req.body.email})
        if(isDuplicateEmail){
          res.send("Email exists");
         } else {
          console.log("Before" ,req.body.password);
          req.body.password=await bcrypt.hash(req.body.password,saltRounds);
          console.log("After",req.body.password);
          let userData = await userModel.create(req.body);
          res.send({msg:"Signup successful",userData});
        }
        }
    }catch (err) {
        res.send("User creation failed");
    }
  }


  exports.loginFun=async(req,res) => {
    try{
      if (!req.body.email){
        res.send("Email cannot be empty");
      } else if (!req.body.password){
          res.send("Password cannot be empty");
        } else {
          let userResp=await userModel.findOne({email:req.body.email});
          if(!userResp){
            req.send("Wrong credentials");
          }else{
            let comparePwd=await bcrypt.compare(req.body.password,userResp.password);
            if(!comparePwd){
              res.send("Wrong credentials");
            }else{
              delete userResp.password;
              let token = jwt.sign({
                data: { _id: userResp._id,name: userResp.name},
              },"yash",{expiresIn: '1h'}
              );
              res.send({msg: "Login success", data : userResp,token: token});
            }
          }
        }
      }catch(err) {
      res.send({"Error":err.message}); 
    }
  }
 
  exports.getUsers=async(req,res)=>{
    try{
      let userList=await userModel.find();
      res.send({msg:"Users list fetched", data : userList});
    }catch(err){
      res.send("Internal server error");
    }
  }

  exports.getMyProfile=async(req,res)=>{
    try{
      let profileDetails=await userModel.findOne({_id: req.jwt.data._id});
      res.send({msg:"Profile fetched", data : profileDetails});
    }catch(err){
      res.send("Internal server error");
    }
  }
