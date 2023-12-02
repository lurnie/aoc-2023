const fs = require('fs'); const readLine = require('readline');
const colorMaxes = {'red': 12, 'green': 13, 'blue': 14};

function returnCubesMultiplied(line) {
    let splitValues = line.split(' ');
    let id = splitValues[1];
    id = Number(id.substring(0, id.length - 1));
    for (let i = 2; i < splitValues.length; i += 2) {
        // unless it's the last value of the last game, get rid of the final character of the color, since it will be , or ;
        let color = (i + 2 < splitValues.length) ? splitValues[i + 1].slice(0, -1) : splitValues[i + 1];
        if (splitValues[i] > colorMaxes[color]) {return 0;}
    }
    return id;
}

async function readLines() {
    const dataStream = fs.createReadStream('input.txt');
    const readingLine = readLine.createInterface(dataStream);

    let sum = 0;
    for await (let line of readingLine) {
        sum += returnCubesMultiplied(line);
    }
    console.log(sum);
}
readLines();