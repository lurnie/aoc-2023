let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let steps = input.split(',');

let sum = 0;
for (let step of steps) {
    let current = 0;
    for (let i = 0; i < step.length; i++) {
        current = ((current + step.charCodeAt(i)) * 17) % 256;
    }
    sum += current;
} 
console.log(sum);