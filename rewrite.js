const fs = require('fs')


fs.readFile('./sample1.txt',(err,data)=>{
  if(err){
    console.log("the error is ", err)
  }
  console.log(data.toString())

  const result = data.toString().replace('tynybay', 'TYNYBAY, INDIA PRIVATE LTD');

fs.writeFile('./sample1.txt',result, ()=>{
  console.log("the file has been modified")
})

})  