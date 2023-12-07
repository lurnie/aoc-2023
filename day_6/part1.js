let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

let times = [];
let current = '';
for (let i = 5; i < lines[0].length + 1; i++) {
    if (lines[0][i] === ' ' || i === lines[0].length) {
        if (current !== '') {times.push(Number(current)); current = '';}
    } else {current += lines[0][i]}
}
let distances = []
for (let i = 9; i < lines[1].length + 1; i++) {
    if (lines[1][i] === ' ' || i === lines[1].length) {
        if (current !== '') {distances.push(Number(current)); current = '';}
    } else {current += lines[1][i]}
}

function marginOfError(time, distance) {
    // basically doing the quadratic formula, then rounding
    let sqrt = Math.sqrt(Math.pow(time, 2) - 4 * distance)
    let start = Math.floor((-time + sqrt) / - 2 + 1);
    let end = Math.ceil((-time - sqrt)/ -2 - 1);
    return end - start + 1;
}

let total = 1;
for (let i = 0; i < times.length; i ++) {
    total *= marginOfError(times[i], distances[i]);
}
console.log(total);