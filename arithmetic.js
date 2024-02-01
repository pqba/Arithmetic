
//Nav functions
function practiceMath() {
    window.location.href = 'mathPractice.html';
}

function goHome() {
    window.location.href = 'startingPage.html';
}
// Setting vars
// Note: https://stackoverflow.com/questions/4908378/javascript-array-of-functions
const basicMath = ['+', '-', '/', '*'];
const extendedMath = ['%', '^'];
let wantExtend = false;
let maximumRange = 10;
let numQuestions = 0;
let numCorrect = 0;
let score = 0;
let totalSeconds = 0;
let currentNums = {
    xVal: 0,
    yVal: 0
};

const symbolMap = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': mod,
    '^': pow
};

//Settings functions
function toggleMath() {
    const button = document.querySelector('.btn');
    // Toggle between btn-light and btn-dark classes
    button.classList.toggle('btn-secondary');
    button.classList.toggle('btn-success');
    wantExtend = !wantExtend;
    console.log(`WANT EXTEND: ${wantExtend}`)
}

function setupSlider() {
    const rangeSlider = document.getElementById("nRange");
    const selectedValue = document.getElementById("selectedValue");
    selectedValue.textContent = `Current Range: ${maximumRange}`;
    rangeSlider.addEventListener('input', function () {
        //maximum range = 'input'.value I believe. 
        maximumRange = parseInt(this.value);
        selectedValue.textContent = `Number Range: ${maximumRange}`;
    });
}

//Game functions
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded before adding event listeners for forms
    loadArithmetic();
});

function loadArithmetic() {

    setupSlider();

    initiateTimer();

    const settings = document.getElementById("settings")
    const form = document.getElementById('myForm');

    let shown = showArithmetic();

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the value from the input field
        let userResponse = document.getElementById('userResponse').value;
        // process input
        const validFormat = handleInput(userResponse, shown);
        // Reset form after processing.
        if (validFormat) { shown = showArithmetic(); }

        form.reset();
    });
}

// Perform Game Check
function checkArithmetic(userInput = '', operator, genNums) {
    //map to function [from operator string]
    const correctResponse = symbolMap[operator](genNums[0], genNums[1]);
    rightAnswer = false;
    if (userInput != '') {
        if (isCorrectAnswer(userInput, correctResponse, operator)) {
            numCorrect++;
            rightAnswer = true;
            interact(rightAnswer);
        } else {
            rightAnswer = false;
            interact(rightAnswer);
        }
        numQuestions++;
        updateScore();
        addPastEquation(genNums[0], operator, genNums[1], correctResponse, rightAnswer);
        totalSeconds = 0;
    }
    else {
        // blank input...
    }
}

function showArithmetic() {
    let operator, genNums;
    do {
        const g = generator();
        operator = g[0];
        genNums = g[1];
    } while (operator == '/' && genNums[1] == '0');
    displayValues(genNums, operator);
    return [operator, genNums];
}

//handle input
function handleInput(userInput, shown) {
    if (!isNaN(userInput)) {
        const interaction = document.querySelector("#mathResponse #interact");
        interaction.textContent = '';
        checkArithmetic(userInput, shown[0], shown[1]);
    }
    else {
        // Display on DOM, keep problem up don't change it
        console.error("Invalid input! Not a number.");
        const interaction = document.querySelector("#mathResponse #interact");
        interaction.textContent = 'Please, enter a valid number.';
        return false;
    }
    return true;

}

function isCorrectAnswer(attempt, key, op) {
    if (op != '/') {
        attempt = parseInt(attempt);
        key = parseInt(key);
        return attempt === key;
    }
    else {
        //op is divide. Possibly implement epsilon.
        attempt = parseFloat(attempt).toFixed(2);
        key = parseFloat(key).toFixed(2);
        return attempt - key < 1e-2;
    }
}

function updateScore() {
    // Don't divide by zero
    if (numCorrect != 0) {
        score = (numCorrect / numQuestions) * 100;
    }
    //Display score
    const sc = document.querySelector("#score");
    sc.textContent = `Score: ${score.toFixed(1)}%`
    //Change Color
    values = interpolateScoreColor();
    const scoreParagraph = document.getElementById("score");
    if (scoreParagraph) {
        scoreParagraph.style.color = `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
    }
}

// Displays past equation on DOM, colored based on correctness.
function addPastEquation(n1, op, n2, ans, wasCorrect) {
    if (op == '/') {
        ans = ans.toFixed(2);
    }
    const para = document.createElement("p");
    let pastEq = `${n1} ${op} ${n2} = ${ans} | ${calcTime()}`;
    wasCorrect ? pastEq = "✓ | " + pastEq :  pastEq = "✕ | " + pastEq;
    para.innerHTML = pastEq;
    document.getElementById("pastEq").prepend(para);

}
function interact(wasCorrect) {
    const interactionText = document.querySelector("#mathResonse #interact");

}
//display log user input for testing purposes
function logInput(userResponse) {
    console.log("Response: " + userResponse + " type:" + typeof (userResponse));
}

//Modify DOM to place the numbers on screen for user to interact with
function displayValues(nums, op) {
    const x = nums[0];
    const y = nums[1];
    const eq = document.querySelector("#page2 #equation");
    if (eq) {
        currentNums = {
            xVal: x,
            yVal: y
        };
        eq.textContent = `${currentNums.xVal} ${op} ${currentNums.yVal}`;
    } else {
        console.error("Could not find equation to modify display.")
    }
}

//return scrambleFunction and findVars for displaying / knowing state
function generator() {
    const fx = scrambleFunction();
    let vars = findVars(maximumRange);
    if (fx == divide) {
        while (vars[1] == 0) {
            vars = findVars(maximumRange);
        }

    }
    return [fx, findVars(maximumRange)];
}
// loop through set of available functions and their symbols. FIX this
function scrambleFunction() {
    let availableFunc = basicMath;
    if (wantExtend) {
        availableFunc = availableFunc.concat(extendedMath)
    }
    const idx = Math.floor(Math.random() * availableFunc.length);
    return [availableFunc[idx]];
}

function findVars(maxVal) {
    //find 2 random numbers in range.
    const x = Math.floor((Math.random() * (maxVal + 1)));
    const y = Math.floor((Math.random() * (maxVal + 1)));
    return [x, y];
}

function initiateTimer() {
    setInterval(setTime, 1000);
}
function calcTime (){
    const secStr = pad(totalSeconds % 60);
    const minStr = pad(parseInt(totalSeconds / 60));
    return `Time: ${minStr}:${secStr}`;
}
function setTime() {
    const timeVal = document.getElementById("time");
    timeVal.innerHTML = calcTime();
    totalSeconds++;
}

// pads time value with zero if needed.
function pad(tValue) {
    var myS = tValue + "";
    if (myS.length < 2) {
        return "0" + myS;
    }
    else {
        return myS;
    }
}
//as mentioned in mathPractice.html, changes based on current score. Score: 0-100
function interpolateScoreColor() {
    // https://stackoverflow.com/questions/340209/generate-colors-between-red-and-green-for-a-power-meter
    let G = (255 * score) / 100
    let R = (255 * (100 - score)) / 100
    let B = 0;
    return [R, G, B]; //R, G, B value. Make sure it's initially black.
}

// Math Functions
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function divide(x, y) {
    if (y === 0) return null;
    return x / y;
}
function multiply(x, y) {
    return x * y;
}
function pow(x, y) {
    let v = 1;
    for (let i = 0; i < y; i++) {
        v *= x;
    }
    return v;
}
function mod(x, y) {
    return x % y;
}