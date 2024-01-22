// Selection of operation elements
let ce = document.querySelector('#CE');
let c = document.querySelector('#C');
let del = document.querySelector('#del');
let plusMinus = document.querySelector('#plusMinus');
let divide = document.querySelector('#divide');
let multiply = document.querySelector('#multiply');
let minus = document.querySelector('#minus');
let plus = document.querySelector('#plus');
let equals = document.querySelector('#equals');
let dot = document.querySelector('#dot');

// Selection of numbers
let numbers = document.querySelectorAll('.numbers');

// Selecting display elements   
let allCalc = document.querySelector('#allCalc');
let actulyNbr = document.querySelector('#actulyNbr');

// Calculation state variables
let currentValue = '';
let previousValue = '';
let operation = null;

// Event listeners for number buttons
numbers.forEach(button => {
    button.addEventListener('click', () => {
        currentValue += button.innerText;
        updateDisplay();
    });
});

// Event listeners for operation buttons
const operationButtons = [plus, minus, multiply, divide];
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentValue === '') return;
        if (previousValue !== '') calculate();
        operation = button.value;
        previousValue = currentValue + operation;
        currentValue = '';
        updateDisplay();
    });
});

// Calculate function
function calculate() {
    let calculation;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '*':
            calculation = prev * current;
            break;
        case '/':
            calculation = prev / current;
            break;
        default:
            return;
    }
    currentValue = calculation;
    previousValue = '';
}

// Update display
function updateDisplay() {
    actulyNbr.value = currentValue;
    allCalc.value = previousValue;
}

// Clear and delete functions
c.addEventListener('click', () => {
    currentValue = '';
    previousValue = '';
    actulyNbr.value = "0";
    allCalc.value = previousValue;
    operation = null;
});

ce.addEventListener('click', () => {
    currentValue = '';
    actulyNbr.value = "0";
});

del.addEventListener('click', () => {
    currentValue = currentValue.toString().slice(0, -1);
    updateDisplay();
});

// Plus-Minus Toggle
plusMinus.addEventListener('click', () => {
    currentValue = currentValue.charAt(0) === '-' ? currentValue.slice(1) : '-' + currentValue;
    updateDisplay();
});

// Equals button event listener
equals.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

// Dot button event listener
dot.addEventListener('click', () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
    updateDisplay();
});
