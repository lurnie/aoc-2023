let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

function distance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

function checkCoordPairs(coordinates) {
    let sum = 0;
    while (coordinates.length > 1) {   
        let galaxy = coordinates[0];
        coordinates.splice(0, 1);
        for (let galaxy2 of coordinates) {sum += (distance(galaxy[0], galaxy[1], galaxy2[0], galaxy2[1]));}
    }
    return sum;
}

// check the columns in advance
let columns = {};
for (let i = 0; i < lines.length; i++) {
    for (let x = 0; x < lines[i].length; x++) {if (lines[i][x] === '#') {columns[x] = true;}}
}

// getting the coordinates
coordinates = [];
let addedY = 0;
for (let y = 0; y < lines.length; y++) {
    if (!lines[y].includes('#')) {addedY += 999999}
    let line = lines[y];
    let addedX = 0;
    for (let x = 0; x < line.length; x++) {
        if (!columns[x]) {addedX += 999999}
        if (line[x] === '#') {
            coordinates.push([x + addedX, y + addedY]);
        }
    }
}
console.log(checkCoordPairs(coordinates));