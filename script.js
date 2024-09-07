
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
let currentInput = '';
let lastOperator = '';

function updateDisplay(value) {
    display.textContent = value || '0';
}


function calculateExpression(expression) {
    try {
        if (/\/0(?!\.)/.test(expression)) {
            throw new Error("Zero Division Error");
        }
        let result = new Function(`return ${expression}`)();

        result = Math.round(result * 100) / 100;

        updateDisplay(result);
        currentInput = result.toString();  
    } catch (error) {
        if (error.message === "Zero Division Error") {
            updateDisplay("Error: Division by 0");
        } else {
            updateDisplay("Error");
        }
        currentInput = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            currentInput = '';
            lastOperator = '';
            updateDisplay('0');
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (value === '=') {
          
            calculateExpression(currentInput);
        } else {
           
            if (['+', '-', '*', '/'].includes(value)) {
                if (['+', '-', '*', '/'].includes(lastOperator)) {
                    return; 
                }
                lastOperator = value;
            } else {
                lastOperator = '';
            }

           
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

