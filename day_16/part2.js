// very unoptimized, it takes like 39 seconds for me

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
function energizedNum(x, y, dir) {
    let energized = []; let reachedPositions = [];
    let currentBeams = [{x: x, y: y, dir: dir}];
    
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
    return energized.length;
}

const width = 110; const height = 110;

let max = 0;
for (let x = 0; x < width; x++) {let num = energizedNum(x, 0, 'down'); if (num > max) {max = num;}}
for (let x = 0; x < width; x++) {let num = energizedNum(x, height - 1, 'up'); if (num > max) {max = num;}}
for (let y = 0; y < height; y++) {let num = energizedNum(0, y, 'right'); if (num > max) {max = num;}}
for (let y = 0; y < height; y++) {let num = energizedNum(width - 1, y, 'left'); if (num > max) {max = num;}}

console.log(max);