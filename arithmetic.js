//Nav functions
function practiceMath() {
    window.location.href = 'mathPractice.html';
}

function goHome() {
    window.location.href = 'startingPage.html';
}


var availableMath = [add, subtract, divide, multiply];


//eventually deprecate this ChatGPT  code.
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded before adding event listeners for forms
    loadForms();

});

function loadForms(){

    const settings = document.getElementById("settings")

    const form = document.getElementById('myForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the value from the input field
        var userResponse = document.getElementById('userResponse').value;

        // process input
        handleInput(userResponse);

        //log for debug purposes
        logInput(userResponse);
        

        // Optionally, you can reset the form after processing
        form.reset();
    });

    settings.addEventListener('submit',function(event){
        event.preventDefault();

        var userNumRange = document.getElementById('numRange').value;


        logInput(userNumRange);

    });
}


//handle input
function handleInput(userInput){
    if(parseInt(userInput)){

    }
}
//display log user input for testing purposes
function logInput(userResponse){
    console.log("Response: " + userResponse  + " " + typeof(userResponse));
}

// loop through set of available functions and their symbols
function scrambleFunction(){
    const idx  = (Math.random() * availableMath.length()) + 1;
    return availableMath[idx];
}

function findVars(){
    //find 2 random numbers in range.

}

//as mentioned in mathPractice.html, changes based on current score
function interpolateScoreColor(){
    var totalAttempts;
    var totalCorrect;

    return [0,0,0]; //R, G, B value. Make sure it's initially black.
}

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

// advanced functions
function pow(x,y){
    return x ** y;
}