let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

let nodes = {};
for (let i = 2; i < lines.length; i++) {
    let split = lines[i].split(' ');
    nodes[split[0]] = {l: split[2].slice(1, -1), r: split[3].slice(0, -1)};
}

let pattern = lines[0];
let steps = 0; let current = 'AAA';
while (current !== 'ZZZ') {
    current = pattern[steps % pattern.length] === 'L' ? nodes[current].l : nodes[current].r;
    steps++;
}
console.log(steps);