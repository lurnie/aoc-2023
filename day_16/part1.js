let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

function reflect(dir, mirror) {
    if (mirror === '\\') {
        if (dir === 'right') {return 'down';} 
        if (dir === 'left') {return 'up';}
        if (dir === 'up') {return 'left';}
        if (dir === 'down') {return 'right';}
    }
    if (mirror === '/') {
        if (dir === 'right') {return 'up';}
        if (dir === 'left') {return 'down';}
        if (dir === 'up') {return 'right';}
        if (dir === 'down') {return 'left';}

    }
}

const width = 110; const height = 110;

let energized = []; let reachedPositions = [];

let currentBeams = [{x: 0, y: 0, dir: 'right'}];

while (currentBeams.length > 0) {
    for (let i = 0; i < currentBeams.length; i++) {
        let beam = currentBeams[i];
        while ( beam.x >= 0 && beam.x < width && beam.y >= 0 && beam.y < height) {
            let currentTile = lines[beam.y][beam.x];
            if (currentTile === '\\' || currentTile === '/') {beam.dir = reflect(beam.dir, currentTile);}
            
            // splitters
            if (currentTile === '|' && (beam.dir === 'left' || beam.dir === 'right')) {
                beam.dir = 'up'; 
                currentBeams.push({x: beam.x, y: beam.y, dir: 'down'})
            }
            if (currentTile === '-' && (beam.dir === 'up' || beam.dir === 'down')) {
                beam.dir = 'left'; 
                currentBeams.push({x: beam.x, y: beam.y, dir: 'right'});
            }

            // records the tile that's been energized
            if (!energized.includes(beam.y * width + beam.x)) {energized.push(beam.y * width + beam.x)}

            // prevents the beam from getting in a loop
            let tileID = `${beam.y * width + beam.x}${beam.dir}`
            if (reachedPositions.includes(tileID)) {break;}
            reachedPositions.push(tileID);

            // the beam moves
            if (beam.dir === 'right') {beam.x++;} 
            if (beam.dir === 'left') {beam.x--;} 
            if (beam.dir === 'down') {beam.y++;} 
            if (beam.dir === 'up') {beam.y--;}
        }
        currentBeams.splice(i, 1);
    }
}

console.log(energized.length)