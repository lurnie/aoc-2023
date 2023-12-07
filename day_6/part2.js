let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

let time = '';
for (let i = 5; i < lines[0].length; i++) {
    if (lines[0][i] !== ' ') {time += lines[0][i];}
}

let distance = '';
for (let i = 9; i < lines[1].length; i++) {
    if (lines[1][i] !== ' ') {distance += lines[1][i]}
}
time = Number(time); distance = Number(distance);

function marginOfError(time, distance) {
    // basically doing the quadratic formula, then rounding
    let sqrt = Math.sqrt(Math.pow(time, 2) - 4 * distance)
    let start = Math.floor((-time + sqrt) / - 2 + 1);
    let end = Math.ceil((-time - sqrt)/ -2 - 1);
    return end - start + 1;
}

let total = marginOfError(time, distance);
console.log(total);