/*let yo= function(names,callback){
    console.log("name is " + names)
    callback("welcome"+names)
}
yo("yash",(resp) =>{
    console.log("calback resp",resp)
})*/


let Atm= function(balance,callback){
    this.balance = balance;
  this.transactions = []
  callback("\nThe balance is "  +  balance)
  
  
  this.withdraw = function(amount) {
    if(amount > balance) {
      console.log('invalid amount');
      return;
    } else {
      balance = balance - amount
      this.transactions.push({ withdraw: amount })
      return balance;
      
      
    }
  

}}

var newAccount= new Atm(1000,(resp)=>{
    console.log("Welcome to the Atm",resp)
    
})

console.log("Your balance after withdrawal",newAccount.withdraw(200))