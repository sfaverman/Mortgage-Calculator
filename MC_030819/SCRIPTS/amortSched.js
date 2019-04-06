/*eslint-env browser*/

function amortizePmts 		(loanAmount,intRate,numPay,monPmt,startDate) {
  var oldBalance=loanAmount;
  var newBalance=loanAmount;                
  intRate=(intRate/100)/12;             
  var monthly=monPmt;
  var owedInterest=0;
  var totalInterestPd=0;
  var tagNam;
  var dispInt;
  /* DATE PROCESSING
  startDate format from from input is mm/dd/yyyy */

  var dt = new Date(startDate);
  console.log("date=" + dt);
  var date = new Date(dt);
  var year = date.getFullYear();
  // var month = date.getMonth()+1;
  var monthIndex = date.getMonth();
  var day = date.getDate() + 1;
    /*
	if (day < 10) {
	  day = '0' + day;
	}

	if (month < 10) {
	  month = '0' + month;
	}*/

  var monthTbl = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var rowDate;
  var ytdPrincipal = 0, ytdInterest = 0,
	  ytdBalance = 0, ytdMonPmt = 0;
  console.log("ytd",ytdPrincipal);
  var yearEnd = false;
  var j = 1;

  // The for loop performs the amortization
  for(var i=1; i <= numPay; i++) {
    var loopNum=i;
    owedInterest=newBalance*intRate;
    dispInt=twoDecimal(owedInterest);
    totalInterestPd=totalInterestPd+owedInterest;
    // Test for the final payment
    if (i < numPay) {
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

	if  (yearEnd)  {
		console.log("i=",i,"numPay=",numPay);

		console.log("yearend true if block");

		 var amtTable = document.getElementById("amortTable");

		var row = amtTable.insertRow(j);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);

		cell1.innerHTML = "<b>Y: "+ (year-1) +"</b>";
		cell2.innerHTML = "<b>Year Total</b>";
		cell3.innerHTML = "<b>"+ytdMonPmt.toFixed(2)+"</b>";
		cell4.innerHTML = "<b>"+ytdPrincipal.toFixed(2) +"</b>";
		cell5.innerHTML = "<b>"+ytdInterest.toFixed(2)+ "</b>";
		cell6.innerHTML = "<b>"+ytdBalance.toFixed(2)+"</b>";

		yearEnd = false;
		j++;
		ytdPrincipal = 0;
		ytdInterest = 0;
	    ytdBalance = 0;
		ytdMonPmt = 0;

	}
	  	 var amtTable = document.getElementById("amortTable");

		var row = amtTable.insertRow(j);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = i;
        console.log ("i=",i,"monthIndex",monthIndex);
		rowDate =  monthTbl[monthIndex] + ' ' + day + ',' + year;

		cell2.innerHTML = rowDate;

		//advance year
		if (monthTbl[monthIndex] === "Dec") {
			monthIndex = 0;
			yearEnd = true;
			year++;
			/*i--;*/
		} else {
			monthIndex++;
		}

		cell3.innerHTML = monPmt;
		cell4.innerHTML = monthly; //principal
		cell5.innerHTML = dispInt;
		cell6.innerHTML = newBalance;

		ytdMonPmt += Number(monPmt);
		console.log("ytd",ytdPrincipal,"monthly",monthly);
		ytdPrincipal += Number(monthly);
		ytdInterest += Number(dispInt);
		ytdBalance += Number(newBalance);
		j++;

   //} // end else not end of the year totals
      
 } /* end for loop - whole amortization table */
    
 return;
}

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

// Declare and initialize the variables
    
  var eleId;
  var eleDat;
    
  var loanName = "Sofia";    
  var loanAmount = document.getElementById("inAmount").value;
  var intRate = document.getElementById("inRate").value;
  var numPay = document.getElementById("inNumPay").value;
  var startDate = document.getElementById("inFirstDay").value;
  console.log("start date is",startDate);

  console.log("loanAmount=",loanAmount," Rate=",intRate," # ofPay=", numPay); 
  
  //Calculate and display the monthly payment amount*/
  var monPmt=calcMonthly(loanAmount,numPay,intRate);
  //Post monthly payment 
  postMonthlyPayments(monPmt);
    
  // Call the amortization routine
  amortizePmts(loanAmount,intRate,numPay,monPmt,startDate);
  /*return;    */
}; /* end btn.onclick */
