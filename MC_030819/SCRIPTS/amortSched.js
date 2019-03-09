/*eslint-env browser*/



function amortizePmts(loanAmount,intRate,numPay,monPmt) {
  var oldBalance=loanAmount;
  var newBalance=loanAmount;                
  intRate=(intRate/100)/12;             
  var monthly=monPmt;
  var owedInterest=0;
  var totalInterestPd=0;
  var tagNam;
  var dispInt
  // The for loop performs the amortization
  for(var i=1;i<=numPay;i++) {
    var loopNum=i;
    owedInterest=newBalance*intRate;
    dispInt=twoDecimal(owedInterest);
    totalInterestPd=totalInterestPd+owedInterest;
    // Test for the final payment
    if (i<numPay) {
      monthly=twoDecimal(monPmt-dispInt);
      oldBalance=newBalance;
      newBalance=twoDecimal(oldBalance-monthly);
    }
    else {
      monthly=(oldBalance-monthly)+owedInterest;
      oldBalance=newBalance;
      newBalance=0;
      monthly=twoDecimal(monthly);
    }
    
    var amtTable = document.getElementById("amortTable");
      
        var row = amtTable.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = i;
        cell2.innerHTML = '01/01/2019';
        cell3.innerHTML = monPmt;
        cell4.innerHTML = monthly;
        cell5.innerHTML = dispInt;
        cell6.innerHTML = newBalance;
      
      
    } /* end for loop */
    
 return;
}
 
/*function displayTableField(eleId,eleDat) {
  document.getElementById(eleId).innerHTML=eleDat;
  return;
}*/

function calcMonthly(principal,numPay,intRate) {
  var monthly;
  var intRate=(intRate/100)/12;
  var principal;
  // The accounting formula to calculate the monthly payment is
  //    M = P * ((I + 1)^N) * I / (((I + 1)^N)-1)
  // The following code  transforms this accounting formula into JavaScript to calculate the monthly payment
  monthly=(principal*(Math.pow((1+intRate),numPay))*intRate/(Math.pow((1+intRate),numPay)-1));
  return twoDecimal(monthly);
}

function postMonthlyPayments(payment) {
    var htmlEl = document.getElementById("outMonthly");
    
    htmlEl.innerText = "$" + payment;
}
 
function twoDecimal(chgVar) {
  var chgVar;
  var twoDec=chgVar.toFixed(2);
  return twoDec;
}

var btn = document.getElementById("btnCalc");
btn.onclick = function () {
  
// Declair and initialize the variables
    
  var eleId;
  var eleDat;
    
  var loanName = "Sofia";    
  var loanAmount = document.getElementById("inAmount").value;
  var intRate = document.getElementById("inRate").value;
  var numPay = document.getElementById("inNumPay").value;
   
  console.log("loanAmount=",loanAmount," Rate=",intRate," # ofPay=", numPay); 
  
  //Calculate and display the monthly payment amount*/
  var monPmt=calcMonthly(loanAmount,numPay,intRate);
  //Post monthly payment 
  postMonthlyPayments(monPmt);
    
  // Call the amortization routine
  amortizePmts(loanAmount,intRate,numPay,monPmt);
  /*return;    */
}; /* end btn.onclick */