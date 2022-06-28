const express = require("express");
const res = require("express/lib/response");
const { reverse } = require("lodash");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./apis/users/model2").userModel;
mongoose.connect("mongodb://localhost:27017/node-training", {}, (err) => {
  if (err) {
    console.log("unable to connect database");
  } else {
    console.log("DB connection created");
  }

});
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));




app.post("/create-user",async(req,res) =>{
  try {
    let data = await userModel.create(req.body);
    res.send({msg: "User created successfully", data});
  } catch (err) {
    res.send("User creation failed ",err);
  }
});




app.get("/get-user", async(req,res) => {
  try{
    let data = await userModel.find({color :{$exists:true}})
    res.send({msg : "Users list", data});
  } catch(err){
    res.send("Failed to fetch the data");
  }
})





app.put("/update-user", async(req,res) => {
  try{
    let data = await userModel.updateOne ({ _id: req.body._id },{$set: {name: req.body.name, price: req.body.price,size: req.body.size,
      color: req.body.color}})
    res.send({msg: "Updated list", data})
  } catch (err) {
    res.send("Failed to update the data")
  }
})





app.delete("/delete-user", async(req,res) => {
  try{
    let data = await userModel.deleteOne({ _id: req.body._id })
    res.send({msg: "Updated list", data})
  } catch (err) {
    res.send("Failed to update the user")
  }
})



app.listen(8082,() => {
    console.log("Port number running on local host:8082");
})

