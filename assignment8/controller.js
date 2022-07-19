const productModel=require("./model").productModel;
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;
    
    
//create products    
exports.createProductData = async(req,res) => {
    try{
        if(!req.body.name){
            res.send("Name cannot be empty");
        } else if (!req.body.price){
            res.send("Price cannot be empty");
        } else if (!req.body.color){
            res.send("Color cannot be empty");
        } else if (!req.body.size){
            res.send("Size cannot be empty");
        } else{
        let productData = await productModel.create(req.body);
        res.send({msg:"Data created successfully",productData});
        }
    }catch(err){
        res.send({"Data creation failed":err.message});
    }
}
 

exports.getProductData = async(req,res) => {
    try{
        let productList = await productModel.find();
        res.send({msg:"List",productList});
    } catch(err) {
        res.send({"Unable to fetch the data":err.message});
    }
}


exports.productByCategory = async(req,res) => {
    try{
        let proList = await productModel.find({categoryId :req.body.categoryId});
        res.send({msg:"List",proList});
    } catch(err){
        res.send({"Unable to fetch the data":err.message});
    }
}


exports.productByColorSize = async(req,res) => {
    try{
        let list = await productModel.find({$and:[{color:req.body.color},{size:req.body.size}]});
        res.send({msg:"List",list});
    } catch(err) {
        res.send({"Unable to fetch the data":err.message});
    }
}


exports.deleteProducts = async(req,res) => {
    try{
        
        let deleteList = await productModel.deleteOne({name: req.body.name});
        res.send({msg:"List",deleteList});
    } catch(err) {
        res.send({"Unable to fetch the data":err.message});
    }
}


exports.topFivePrices = async(req,res) => {
    try{
        
        let topFive = await productModel.aggregate([
            { 
                $group: {
                     _id:"$price",
                    topFive:{$push:"$name"}
                    }
            },
            {
                $sort: {_id: -1}
            },
            {
                $limit: 5
            }
            
]);
        res.send({msg:"List",topFive});
    } catch(err) {
        res.send({"Unable to fetch the data":err.message});
    }
}
exports.nthHighestPrice = async(req,res) => {
    try{
        let n = req.params.nthprice;
        console.log(n);
       
        let nthHighest = await productModel.aggregate([
           { $group: {
                _id: "$price",
                nthHighest:{$push:"$name"}
                }
            },{
                $sort: {_id: -1}
            },{
                $skip: n-1
            },
            {
                $limit: 1
            }


        ])

        res.send({msg:"List",nthHighest});
    } catch(err) {
        res.send({"Unable to fetch the data":err.message});
    }
}
