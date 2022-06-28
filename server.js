const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./apis/users/model").userModel;
mongoose.connect("mongodb://localhost:27017/node-training", {}, (err) => {
  if (err) {
    console.log("unable to connect database");
  } else {
    console.log("DB connection created");
  }
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "50mb" }));

app.post("/create-user", (req, res) => {
  console.log("User details", req.body);
  userModel.create(req.body, (err, userResp) => {
    console.log("Error", err);
    if (err) {
      res.send("Could not create user" + err.message);
    } else {
      res.send({ msg: "user created succesfully", data: userResp });
    }
  });
});

app.get("/get-users-list", (req, res) => {
  userModel.find({}, (err, usersList) => {
    if (err) {
      res.send("failed to get users list" + err.message);
    } else {
      res.send({ msg: "Users list", data: usersList });
    }
  });
});
app.put("/update-user/:userID", (req, res) => {
  console.log("user body", req.params);

  console.log("user body", req.body);
  userModel.updateOne(
    { _id: req.params.userID },
    {
      $set: {
        email: req.body.email,
        name: req.body.name,
        branch: req.body.branch,
      },
    },
    (err, userUpdateResp) => {
      if (err) {
        res.send("user update failed" + err.message);
      } else {
        res.send({ msg: "user updated succesfully", data: userUpdateResp });
      }
    }
  );
});
app.delete("/delete-user/:userID", (req, res) => {
  console.log("user body", req.params);

  userModel.deleteOne(
    { _id: req.params.userID }, //Condition

    (err, deleteREsp) => {
      if (err) {
        res.send("user update failed" + err.message);
      } else {
        res.send({ msg: "user updated succesfully", data: deleteREsp });
      }
    }
  );
});

app.delete("/delete-user/:userID")

app.listen(8080, () => {
  console.log("Port number running  on localhost:8080");
});





