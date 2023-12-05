const fs = require('fs');
let symbols = [ '*', '/', '+', '@', '=', '%', '&', '$', '#', '-'];
let input = fs.readFileSync('input.txt').toString().split('\n');

function findSymbols(input, startX, endX, y) {
    let toCheck = [];
    // check left of the first character
    if (startX > 0) {toCheck.push(input[y][startX-1]); toCheck.push(input[y+1][startX-1]); if (y>0) {toCheck.push(input[y-1][startX-1]);}}
    // check directly up and down for each character
    for (x = startX; x <= endX; x++) {toCheck.push(input[y+1][x]); if (y>0) {toCheck.push(input[y-1][x]);}}
    // check right of the last character
    toCheck.push(input[y][endX+1]); toCheck.push(input[y+1][endX+1]); if (y>0) {toCheck.push(input[y-1][x]);}
    
    for (let item of toCheck) {if (symbols.includes(item)) {return true;}}
    return false;
}

let sum = 0;
for (let y = 0; y < 141; y++) {
    let current = ''; let startX = 0;
    for (let x = 0; x < 141; x++) {
        if (!isNaN(input[y][x]) && x < 140) {
            if (current === '') {startX = x;}
            current += Number(input[y][x]);
        } else {
            if (current !== '') {
                // check the current number
                if (findSymbols(input, startX, x-1, y)) {sum += Number(current);}
                current = '';
            }
        }
    }
} 
console.log(sum);