function practiceMath() {
    window.location.href = 'mathPractice.html';
}

function goHome() {
    window.location.href = 'startingPage.html';
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

function pow(x,y){
    return x ** y;
}