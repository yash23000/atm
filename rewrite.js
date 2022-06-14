const fs = require('fs')

fs.writeFile('./sample1.txt','TYNYBAY, INDIA PRIVATE LTD', ()=>{
  console.log("the file has been modified")
})
fs.readFile('./sample1.txt',(err,data)=>{
  if(err){
    console.log("the error is ", err)
  }
  console.log(data.toString())
})