let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

function extrapolate(array) {
    let zero = true;
    let differences = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {zero = false;} 
        if (i + 1 < array.length) {differences.push(array[i + 1]-array[i]);}
    }
    if (zero) {return 0;}
    return Number(array[array.length - 1]) + extrapolate(differences);
}

let sum = 0;
for (let line of lines) {
    sum += extrapolate(line.split(' '));
}
console.log(sum);