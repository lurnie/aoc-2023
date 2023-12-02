const fs = require('fs'); const readLine = require('readline');
let digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function findNumbers(line, start, condition, change) {
    for (let i = start; condition(i); i += change) {
        if (!isNaN(Number(line[i]))) {return line[i];} else {
            let pastDigits = '';
            for (let i2 = i; i - i2 < 5; i2--) {
                // looks 5 characters "back" into the line to see if there's a written digit
                pastDigits = line[i2] + pastDigits;
                if (digits.includes(pastDigits)) {return digits.indexOf(pastDigits) + 1;}
            }}}
}
async function readLines() {
    const dataStream = fs.createReadStream('input.txt');
    const readingLine = readLine.createInterface({input: dataStream});

    let sum = 0;
    for await (let line of readingLine) {
        let first = findNumbers(line, 0, (i) => {return i < line.length}, 1);
        let last = findNumbers(line, line.length - 1, (i) => {return i >= 0;}, -1);

        let calibrationValue = Number(`${first}${last}`);
        sum += calibrationValue;
    }
    console.log(sum);
}
readLines();