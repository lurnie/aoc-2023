const fs = require('fs');
let input = fs.readFileSync('input.txt').toString().split('\n');

function fullNumber(input, x, y) {
    let startX; let endX;
    for (let i = x; i >= 0; i--) {
        if (isNaN(input[y][i])) {break;}
        startX = i;
    }
    for (let i = x; i <= 141; i++) {
        endX = i;
        if (isNaN(input[y][i])) {break;}
    }
    return [input[y].slice(startX, endX), endX];
}

function findNumbers(input, x, y) {
    let numbers = [];
    let check;

    if (y>0) {for (let i = x > 0 ? x-1 : x; i <= x + 1; i++) {if (!isNaN(input[y-1][i])) {
        check = fullNumber(input, i, y-1); numbers.push(check[0]); i = check[1];
    }}}

    for (let i = x > 0 ? x-1 : x; i <= x + 1; i++) {if (!isNaN(input[y+1][i])) {
        check = fullNumber(input, i, y+1); numbers.push(check[0]); i = check[1];
    }}
    
    if (x > 0 && !isNaN(input[y][x-1])) {numbers.push(fullNumber(input, x-1, y)[0]);}
    if (!isNaN(input[y][x+1])) {numbers.push(fullNumber(input, x+1, y)[0]);}
    if (numbers.length === 2) {return numbers[0] * numbers[1];}
    return 0;
}

let sum = 0;
for (let y = 0; y < 141; y++) {
    for (let x = 0; x < 141; x++) {
        if (input[y][x] === '*') {sum += findNumbers(input, x, y);}
    }
} 
console.log(sum)