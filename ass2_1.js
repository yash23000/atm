

let atm=function(balance,callback){
  let balance = balance;
  let transactions = []
  let getBalance = function() {
    return balance
  };
  setTimeout(funtion () {
      console.log("the balance is" + balance);
      callback();
},200);
}


transactions=[]
let widthdraw = function(amount) {
  if(amount > balance) {
    console.log('invalid amount');
    return;
  } else {
    balance = balance -  amount
    this.transactions.push({ widthdraw: amount })
    return balance;
  }
}

var account = new atm(100)

console.log(account.getBalance())
console.log(account.widthdraw(200))

