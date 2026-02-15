const screen = document.querySelector(".screen");
const error = document.querySelector(".errors");

const buttons = document.querySelectorAll(".buttons");

/*
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");

const plus = document.querySelector(".plus");
const minus = document.querySelector(".subtract");
const times = document.querySelector(".multiply");
const by = document.querySelector(".divide");
*/

const del = document.querySelector(".del");
const equal = document.querySelector(".equal");

const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");


let equation = {
    firstNum: "",
    op: "",
    secondNum: "",
    firstHalf: "true",
    secondHalf: "false",
    divideZero: "false",
}

function reset(screen, equation) {
    screen.replaceChildren();
    error.replaceChildren();
    error.style.backgroundColor = "white";
    equation.firstNum = "";
    equation.op =  "";
    equation.secondNum = "";
    equation.firstHalf = "true";
    equation.secondHalf = "false";
    equation.divideZero = 'false';
}

reset(screen, equation);

function add(numOne, numTwo){
    return numOne + numTwo;
}

function subtract(numOne, numTwo){
    return numOne - numTwo;
}

function mult(numOne, numTwo){
    return numOne * numTwo;
}

function division(numOne, numTwo){
    return numOne / numTwo;
}

function operate(equation){
    let numOne = Number(equation.firstNum);
    let numTwo = Number(equation.secondNum);

    if (equation.op === "+"){
        return add(numOne, numTwo);
    }
    else if (equation.op === "-"){
        return subtract(numOne, numTwo);
    }
    else if (equation.op === "x"){
        return mult(numOne, numTwo);
    }
    else if (equation.op === "/"){
        if (numTwo > 0){
            return division(numOne, numTwo);
        }
        else{
            equation.divideZero = "true";
            return add(numOne, numTwo);
        }
    }
    

}


del.addEventListener("click", () => {
    reset(screen, equation), console.log("del test");
});


numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (equation.firstHalf == "true"){
            equation.firstNum += number.textContent
            console.log(equation.firstNum);
            console.log("first num test");
        }
        else{
            equation.secondNum += number.textContent
            console.log(equation.secondNum);
            console.log("second num test");
        }
        const nodeC = document.createElement("p");
        nodeC.textContent = number.textContent;
        screen.appendChild(nodeC);
        console.log("numbers test");
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (equation.op){
            reset(screen, equation);
            error.style.backgroundColor = "red";
            const nodeE = document.createElement("p");
            nodeE.textContent = "You Can Only Use One Operation";
            error.appendChild(nodeE);
            console.log("error test"); 
        }
        else{
            equation.op = operator.textContent;
            console.log(equation.op);
            equation.firstHalf = "false";
            equation.secondHalf = "true";
            const nodeC = document.createElement("p");
            nodeC.textContent = operator.textContent;
            screen.appendChild(nodeC);
            console.log("op test"); 
        }
    });
});

equal.addEventListener("click", () =>{
    if (equation.secondHalf == "true"){
        const nodeO = document.createElement("p");
        nodeO.textContent = String(operate(equation));
        if (equation.divideZero === "false"){
            screen.replaceChildren();
            screen.appendChild(nodeO);
            equation.firstNum = String(operate(equation));
            equation.secondNum = "";
            equation.op = "";
        }
        else{
            reset(screen, equation);
            error.style.backgroundColor = "red";
            const nodeE = document.createElement("p");
            nodeE.textContent = "You Cannot Divide by 0";
            error.appendChild(nodeE);
            console.log("error test");
        }
    }
    else{
        reset(screen, equation);
        error.style.backgroundColor = "red";
        const nodeE = document.createElement("p");
        nodeE.textContent = "You Need a Second Number to Compute";
        error.appendChild(nodeE);
        console.log("error test");
    }
});

