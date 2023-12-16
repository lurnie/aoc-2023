let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let steps = input.split(',');


function hash(value) {
    let current = 0;
    for (let i = 0; i < value.length; i++) {
        current = ((current + value.charCodeAt(i)) * 17) % 256;
    }
    return current;
}

function checkLenses(box, label) {
    // finx where a lens with a specific label is within a box
    for (let i = 0; i < box.length; i++) {
        let lens = box[i]; 
        if (lens.label === label) {return i;}
    }
    return false;
}

let boxes = {}
for (let step of steps) {
    if (step.includes('=')) {
        // adding a lens
        let index = step.indexOf('=');
        let label = step.slice(0, index);
        let box = hash(label);
        let newVal = step.slice(index+1);
        if (boxes[box]) {
            let lensIndex = checkLenses(boxes[box], label);

            // if a lens with this label doesn't already exist, then add it to the end
            if (lensIndex === false) {lensIndex = boxes[box].length;} 

            boxes[box][lensIndex] = {'label': label, 'val': newVal};
        } else {
            boxes[box] = [{'label': label, 'val': newVal}];}

    } else {
        // removing a lens
        let label = step.slice(0, -1);
        let box = hash(label);
        if (boxes[box]) {
            let index = checkLenses(boxes[box], label);
            if (index !== false) {boxes[box].splice(index, 1);}
        }
    }
}

// add up the focusing power
let current = 0;
for (boxNum in boxes) {
    boxNum = Number(boxNum);
    let box = boxes[boxNum];
    for (let i = 0; i < box.length; i++) {
        let lens = box[i];
        current += (boxNum + 1) * (i + 1) * lens.val;
    }
}
console.log(current);