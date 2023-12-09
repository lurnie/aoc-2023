let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

function gcd(a, b) {
    if (b === 0) {return a;}
    return gcd(b, a % b)
}

function lcmPair(a, b) {return a*b / gcd(a, b)}

function lcm(...nums) {
    let lcm = lcmPair(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        lcm = lcmPair(lcm, nums[i]);
    }
    return lcm;
}

let nodes = {};
let currents = [];
for (let i = 2; i < lines.length; i++) {
    let split = lines[i].split(' ');
    nodes[split[0]] = {l: split[2].slice(1, -1), r: split[3].slice(0, -1)};
    if (split[0][split[0].length - 1] === 'A') {currents.push(split[0])}
}
let pattern = lines[0];
let steps = 0;
let stepsToZ = [];
while (stepsToZ.length < currents.length) {
    let nextMove = pattern[steps % pattern.length];
    steps++
    for (let i = 0; i < currents.length; i++) {
        currents[i] = nextMove === 'L' ? nodes[currents[i]].l : nodes[currents[i]].r;
        if (currents[i][currents[i].length - 1] === 'Z') {stepsToZ.push(steps);}
    }
}

console.log(lcm(...stepsToZ));