const fs = require('fs'); const readLine = require('readline');

function findNumbers(line, start, condition, change) {
    for (let i = start; condition(i); i += change) {
        if (!isNaN(Number(line[i]))) {return line[i];}
    }
}
async function readLines() {
    const dataStream = fs.createReadStream('input.txt');
    const readingLine = readLine.createInterface({input: dataStream})

    let sum = 0;
    for await (let line of readingLine) {
        let first = findNumbers(line, 0, (i) => {return i < line.length}, 1);
        let last = findNumbers(line, line.length - 1, (i) => {return i >= 0}, -1)
        let calibrationValue = Number(`${first}${last}`);
        sum += calibrationValue;
    }
    console.log(sum);
}
readLines();