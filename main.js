// const operations
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '×';
const DIVIDE = '÷';
const EQUALS = '=';
const CLEAR = 'clear';

// basic operations
const addFunction = (a, b) => a+b;
const subtractFunction = (a, b) => a-b;
const multiplyFunction = (a, b) => a*b;
const divideFunction = (a, b) => a/b;

const operations = {
  [ADD]: addFunction,
  [SUBTRACT]: subtractFunction,
  [MULTIPLY]: multiplyFunction,
  [DIVIDE]: divideFunction,
};

const operate = (operator, a, b) => operations[operator](a,b);

const getNewValueState = () => {
  return {
    first: '',
    operator: null,
    second: '',
  };
}

const getUpdatedValueState = (input, currentValue) => {
  if (input === CLEAR) {
    currentValue = getNewValueState();
  } else if (input === EQUALS) {
    currentValue.first = operate(currentValue.operator, Number(currentValue.first), Number(currentValue.second));
    currentValue.second = '';
    currentValue.operator = null
  } else if (Object.keys(operations).includes(input)) {
    currentValue.operator = input;
  } else if (currentValue.operator) {
    currentValue.second += input;
  } else {
    currentValue.first += input;
  }

  return currentValue;
}

const getUpdatedDisplayValue = ({first, operator, second}) => {
  if (!first) {
    return 0;
  }

  return `${first}${operator ? ' ': ''}${operator ? operator : ''}${second ? ' ' : ''}${second}`;
}

let currentValue = getNewValueState();
const buttons = [...document.querySelectorAll('.input')];
buttons.forEach(button => {
  button.addEventListener('click', () => {
    currentValue = getUpdatedValueState(button.textContent, currentValue);
    console.log(`currentValue: ${JSON.stringify(currentValue)}`);
    const display = document.querySelector('#display');
    display.textContent = getUpdatedDisplayValue(currentValue);
  });
});
