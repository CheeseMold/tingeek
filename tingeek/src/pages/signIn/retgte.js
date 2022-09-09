const x = (array, num) => {return array.filter((e) => {return e == num}).length}

function spinTwelve(times) {
    let num = 12 ** times;
    let array = [];
    let array2 = [];
    for (let j = 0; j < 100; j++) {    
        for (let i = 0; i < times; i++) {
            array.push(Math.floor(Math.random() * 12) + 1);
        }
        array2.push(x(array, 1) > 4);
        array = [];
    }

    console.log(array2);
    return x(array2, true);
}

console.log(spinTwelve(8));
