let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split('\r\n');

let sum = 0;
for (let line of lines) {
    let split = line.split(' ');
    while (split.includes('')) {split.splice(split.indexOf(''), 1);}
    let card = split.slice(2, split.indexOf('|') );
    let win = split.slice(split.indexOf('|') + 1);
    let winnings = 0;
    for (let i = 0; i < card.length; i++) {
        if (win.includes(card[i])) {
            winnings *= 2;
            if (winnings === 0) {winnings = 1;}
        }
    }
    sum += winnings;
}
console.log(sum)