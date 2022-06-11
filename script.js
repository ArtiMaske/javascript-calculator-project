const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

//declare variable to store the number
let dis1Num = '';
let dis2Num = '';
let operator = '';
let result = null;//store temperory result
let haveDot = false;

numbersEl.forEach(number => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
    //console.log(dis2Num);
  })
});

operationEl.forEach(operation => {
  operation.addEventListener('click', (e) => {
    if (!dis2Num) return;
    //adding dot in second number
    haveDot = false;
    const operationName = e.target.innerText;
    // num1 , num2 & operator
    if (dis1Num && dis2Num && operator) {
      mathOperation();
    } else {
      //convert string to number
      result = parseFloat(dis2Num);
    }
    clearDis2(operationName);
    operator = operationName;
    //console.log(result);
  })
});

function clearDis2(opeName = '') {
  dis1Num += dis2Num + '' + opeName + '';
  display1El.innerText = dis1Num;
  display2El.innerText = '';
  dis2Num = '';
  tempResultEl.innerText = result;
}

function mathOperation() {
  if (operator === '+') {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (operator === '-') {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (operator === 'X') {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (operator === '/') {
    result = parseFloat(result) / parseFloat(dis2Num);  
  } else if (operator === '%') {
    result = parseFloat(result) % parseFloat(dis2Num);
  }   
}

equalEl.addEventListener('click', (e) => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearDis2();
  display2El.innerText = result;
  tempResultEl.innerText = '';
  dis2Num = result;
  dis1Num = '';
})+

clearAllEl.addEventListener('click', (e) => {
  display1El.innerText = '0';
  display2El.innerText = '0';
  dis1Num = '';
  dis2Num = '';
  result = ''; 
  tempResultEl.innerText = '0';
})

clearLastEl.addEventListener('click', (e) => {
  display2El.innerText = display2El.innerText.slice(0, -1);
})

window.addEventListener('keydown', (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickNumbers(e.key); // for numbers
  } else if
    (
    e.key === '+' ||
    e.key === '-' ||
    e.key === '%' || 
    e.key === '/'
  ) {
    clickOperations(e.key);//for operators
  } else if (e.key === '*') {
    clickOperations('X');
  } else if (e.key == 'Enter' || e.key === '=') {
    clickEqual();
  }
})

function clickNumbers(key) {
  numbersEl.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

function clickOperations(key) {
  operationEl.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

function clickEqual() {
  equalEl.click();
}
