const add = (a, b) => Math.round((Number(a) + Number(b)) * 100000) / 100000;
const subtract = (a, b) => Math.round((a - b) * 100000) /100000;
const multiply = (a, b) => Math.round((a * b) * 100000) /100000;
const divide = (a, b) => Math.round((a / b) * 100000) /100000;

let left = null;
let right = null;
let operator = null;
let result = '';

let clear = document.querySelector('#clear');
let display = document.querySelector('#display');
let float = document.querySelector('#float');

function operate(operator, left, right) {
    right = result;
    if (!right || !left || !operator) {

        return display.textContent;
    }
    else if (right == 0 && operator == '/') {
        input.removeEventListener('click', myFunction);
        return 'Not possible to calculate. Press AC';
    } else if (operator && left && typeof Number(right) == 'number') {
        if (operator === '+') return add(left, right);
        else if (operator === '-') return subtract(left, right);
        else if (operator === '*') return  multiply(left, right);
        else if (operator === '/') return divide(left, right); 
    } else {
        input.removeEventListener('click', myFunction);
        return 'Error. Press AC'
    }
}

clear.addEventListener('click', function(event) {
    input.addEventListener('click', myFunction);
    result = ''
    display.textContent = result;
    left = null;
    right = null;
    operator = null;
});

floatFunction = function() {
    result += '.';
    float.removeEventListener('click', floatFunction);
} 

float.addEventListener('click', floatFunction)

const myFunction = function() {
    let target = event.target;
    switch(target.id) {
        case 'one' : result += '1';
            break;
        case 'two' : result += '2';
            break;
        case 'three' : result += '3';
            break;
        case 'four' : result += '4';
            break;
        case 'five' : result += '5';
            break;
        case 'six' : result += '6';
            break;
        case 'seven' : result += '7';
            break;
        case 'eight' : result += '8';
            break;
        case 'nine' : result += '9';
            break;
        case 'zero' : result += '0';
            break;
        case 'divide' : 
            if (operator !== null) result = operate(operator, left, right);
            operator = '/';
            left = result;
            result = '';
            break;
        case 'multiply' : 
            if (operator !== null) result = operate(operator, left, right);
            operator = '*';
            left = result;
            result = '';
            break;
        case 'subtract' : 
            if (result == '') {
                result += '-';
                break;
            } else if (operator !== null) result = operate(operator, left, right); 
            operator = '-';
            left = result;
            result = '';
            break;
        case 'add' : 
            if (operator !== null) result = operate(operator, left, right);
            operator = '+';
            left = result;
            result = '';
            break;
        case 'plusminus' : 
            result = display.textContent;
            if(Array.from(result)[0] == '-') {
                result = result.slice(1);
                if (left == '-' + result) left = result;
            } else {
                result = '-' + result;
                if (left == result.slice(1)) left = result;
            }
            break;
        case 'percent' : 
            result = Math.round((result / 100) * 100000) / 100000;
            if (left == result * 100) left = result;
            break;
        case 'operate' :  
            result = operate(operator, left, right);
            operator = null;
            break;
    }
    if (result == '') display.textContent = left;
    else display.textContent = result;

    if (!display.textContent.includes('.')) float.addEventListener('click', floatFunction);
}

const myFunctionKey = function(e) {
    const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (let symbol of symbols) {
        if (symbol == e.key) result += e.key;
    }
    display.textContent = result;
}

let input = document.querySelector('#input');
input.addEventListener('click', myFunction);
document.addEventListener('keydown', myFunctionKey);