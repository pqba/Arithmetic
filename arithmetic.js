
//Nav functions
function practiceMath() {
    window.location.href = 'mathPractice.html';
}

function goHome() {
    window.location.href = 'startingPage.html';
}
// Setting vars
// Note: https://stackoverflow.com/questions/4908378/javascript-array-of-functions
let basicMath = ['+','-','/','*'];
let extendedMath = ['%','**'];
let wantExtend = false;
let maximumRange = 10;
let numQuestions = 0;
let score = 0;
let currentNums = {
    xVal : 0,
    yVal : 0
};

const symbolMap = {
    '+': add,
    '-': subtract,
    '*' : multiply,
    '/' : divide,
    '%': mod,
    '^': pow
};

//actual functions
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded before adding event listeners for forms
    loadArithmetic();

});

function loadArithmetic(){

    const settings = document.getElementById("settings")
    const form = document.getElementById('myForm');

    let shown = showArithmetic();

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the value from the input field
        let userResponse = document.getElementById('userResponse').value;
        // process input
        handleInput(userResponse,shown);
        // Reset form after processing.
        shown = showArithmetic();
        form.reset();

    });

    settings.addEventListener('submit',function(event){
        event.preventDefault();

        let userNumRange = document.getElementById('numRange').value;
        logInput(userNumRange);

    });
}
// Perform Game Check
function checkArithmetic(userInput = '',operator,genNums){
    //map to function [from operator string]
    const correctResponse =  symbolMap[operator](genNums[0],genNums[1]);
    if(userInput != ''){
        console.log(`U: ${userInput}  C:${correctResponse}`)
        if(isCorrectAnswer(userInput,correctResponse)){
            console.log("yay!!")
        }else{
            console.log("nay...")
        }
    }
    else {
        // blank input...
    }
}

function showArithmetic(){
    const g = generator();
    const operator = g[0];
    const genNums = g[1];
    displayValues(genNums,operator);
    return [operator,genNums];
}

//handle input
function handleInput(userInput,shown){
    if(!isNaN(userInput)){
        console.log(`SHOWN ${shown[0]} ${shown[1]}`);
        checkArithmetic(userInput,shown[0],shown[1]);
    }
    else {
        // Display on DOM, keep problem up don't change it
        console.error("Invalid input! Not a number.");
    }
}

function isCorrectAnswer(attempt, key, op){
    if(op != '/'){
        attempt = parseInt(attempt);
        key = parseInt(key);
        return attempt === key;
    }
    else {
        //op is divide. Possibly implement epsilon.
        attempt = parseFloat(attempt);
        key = parseFloat(key);
        return attempt === key;
    }
}
//display log user input for testing purposes
function logInput(userResponse){
    console.log("Response: " + userResponse  + " type:" + typeof(userResponse));
}

//Modify DOM to place the numbers on screen for user to interact with
function displayValues(nums, op){
    const x = nums[0];
    const y = nums[1];
    const eq = document.querySelector("#equation .center");
    if(eq){
        currentNums = {
            xVal: x,
            yVal: y
        };
        eq.textContent = `${currentNums.xVal} ${op} ${currentNums.yVal}`;
    }else{
        console.error("Could not find equation to modify display.")
    }
}

//return scrambleFunction and findVars for displaying / knowing state
function generator(){
    const fx = scrambleFunction();
    return [fx,findVars(maximumRange)];
}
// loop through set of available functions and their symbols. FIX this
function scrambleFunction(){
    let availableFunc = basicMath;
    if(wantExtend){
        for(let i = 0; i < extendedMath.length;i++){
            availableFunc.push(extendedMath[i]);
        }
    }
    const idx = Math.floor(Math.random() *  availableFunc.length);
    return [availableFunc[idx]];
}

function findVars(maxVal){
    //find 2 random numbers in range.
    const x = Math.floor((Math.random() * (maxVal+1)));
    const y = Math.floor((Math.random() * (maxVal+1)));
    return [x,y];
}

//as mentioned in mathPractice.html, changes based on current score
function interpolateScoreColor(){
    let totalAttempts;
    let totalCorrect;

    return [0,0,0]; //R, G, B value. Make sure it's initially black.
}

// Math Functions
function add(x,y) {
    return x+y;
}
function subtract(x,y) {
    return x-y;
}
function divide(x,y){
    if(y === 0) return null;
    return x / y;
}
function multiply(x,y){
    return x * y;
}
function pow(x,y){
    let v = 1;
    for(let i = 0 ; i < y; i++){
        v *=x;
    }
    return v;
}
function mod(x,y){
    return x % y;
}