/*eslint-env browser*/

//function to calculate monthly mortage payment per formula:
// c = p * r * Math.pow((1 + r), n) / Math.pow((1 + r), n) - 1
// where p is a principal - loan amount,
// r - interest rate, n - number of monthly payments

function calculateMortgage(p, r, n) {
    "use strict";
    
    // convert percentage to a decimal
    r = percentToDecimal(r);
    
    // convert years to months
    n = yearsToMonth(n);
    
    var monthlyPayment = (p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
    return monthlyPayment.toFixed(2);
    //return parseFloat(monthlyPayment.toFixed(2)); ??? not sure if parseFloat needed
    
}

function percentToDecimal(percent) {
    return (percent / 12) / 100;
}

function yearsToMonth(year) {
    return year * 12;
}

function postMonthlyPayment(payment) {
    var htmlEl = document.getElementById("outMonthly");
    
    htmlEl.innerText = "$" + payment;
}

var btnOther = document.getElementById("otherBtn");
//window.console.log(btnOther);
btnOther.onclick = function () {
    var otherTerm = document.getElementById("otherTerm");
    otherTerm.innerHTML = '<input type="text" id="otherPeriod" size="3">';
}

var btn = document.getElementById("btnCalc");
//window.console.log(btn);
btn.onclick = function () {
	event.preventDefault();
	var formA = document.getElementById("formC");
	formC.checkValidity();
    formC.reportValidity();
    var cost = document.getElementById("inCost").value; 
    //console.log(cost);

        if (cost == "") {
            alert("Please enter a cost amount");
            return false;
        }

        if (cost < 0) {
            alert("Invalid cost");
            return false;
        }
    
    var downPayment = document.getElementById("inDown").value;
    var interest = document.getElementById("inInterest").value;
    var inPeriod = document.getElementsByName('term');

    for (var i = 0, length = inPeriod.length; i < length; i++) {
         if (inPeriod[i].checked)
         {
          // do whatever you want with the checked radio
         /* alert(inPeriod[i].value);*/
         var years = inPeriod[i].value;

         if (years == 0) {
            //window.console.log("Hello");
            years = document.getElementById("otherPeriod").value;
            //window.console.log("years from Other=", years);
         }  

          // only one radio can be logically checked, don't check the rest
          break;
         }
    }
    
    //window.console.log(cost, downPayment, interest, years);
    
    var loanAmount = cost - downPayment;
    
    //window.console.log("Loan Amount ",loanAmount);
    
    var pmt = calculateMortgage(loanAmount, interest, years);
    
    postMonthlyPayment(pmt);
};
