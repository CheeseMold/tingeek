const has = (array) => {
    return array.includes(1) && array.includes(2) && array.includes(3) && array.includes(4)
}

const getRandArray = (size, startRange, endRange) => {
  let arr = [];
  let num = 0;
  while (!has(arr)) {
    let int = Math.floor(Math.random() * endRange) + startRange; 
    if (!arr.includes(int)) arr.push(int);
    num++;
  }
  console.log(arr);
  return num;
};

// const hasNoMatches = (array) => {
//     for (let i = 0; i < array.length; i++) 
//         for (let j = i + 1; j < array.length; j++) 
//             if (array[i] === array[j]) return false;
//     return true;
// }

// function mathStuff() {
    
// }

// let mainArray = getRandArray(4, 1, 4);
// console.log(mainArray)

// while (!hasNoMatches(mainArray)) {
//     mainArray = getRandArray(4, 1, 4);
//     console.log(mainArray);
// }

console.log(getRandArray(4, 1, 4));