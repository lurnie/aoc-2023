const fs = require('fs'); const readLine = require('readline');

function cubesMultiplied(line) {
    let splitValues = line.split(' ');
    let colorMaxes = {'red': 0, 'green': 0, 'blue': 0};

    for (let i = 2; i < splitValues.length; i += 2) {
        // unless it's the last value of the last game, get rid of the final character of the color, since it will be , or ;
        let color = (i + 2 < splitValues.length) ? splitValues[i + 1].slice(0, -1) : splitValues[i + 1];
        if (Number(splitValues[i]) > colorMaxes[color]) {colorMaxes[color] = Number(splitValues[i]); }
    }
    return colorMaxes['red'] * colorMaxes['green'] * colorMaxes['blue'];
}

async function readLines() {
    const dataStream = fs.createReadStream('input.txt');
    const readingLine = readLine.createInterface(dataStream);

    let sum = 0;
    for await (let line of readingLine) {
        sum += cubesMultiplied(line);
    }
    console.log(sum);
}
readLines();