const screen = document.getElementById("screen");
const backspaceBtn = document.getElementById("backspace");
const clearBtn = document.getElementById("clear");
const buttons = document.querySelectorAll("button");
let firstValue = 0;
let awaitingNextValue = false;
let operatorValue = "";

// ========= logic ===========
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
  if (awaitingNextValue) {
    screen.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = screen.textContent;
    screen.textContent = displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!screen.textContent.includes(".")) {
    screen.textContent = `${screen.textContent}.`;
  }
}

function backSpace() {
  const displayValue = screen.textContent;
  if (displayValue.length === 1) {
    screen.textContent = "0";
  } else {
    screen.textContent = displayValue.slice(0, -1);
  }
}

function useOperator(operator) {
  const currentValue = Number(screen.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    screen.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    sendNumberValue(key);
  }
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    useOperator(key);
  }
  if (key === ".") {
    addDecimal();
  }
  if (key === "=" || key === "Enter") {
    useOperator("=");
  }
  if (key === "Escape") {
    clearBtn.click();
  }
  if (key === "Backspace") {
    backSpace();
  }
});
// =============eventListener section ==================
buttons.forEach((button) => {
  if (
    !button.classList.contains("decimal") &&
    !button.classList.contains("operator")
  ) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  }
});
clearBtn.addEventListener("click", () => (screen.textContent = "0"));
backspaceBtn.addEventListener("click", backSpace);
