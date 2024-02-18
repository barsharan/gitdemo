// Task 1: Using array.map()
const array = ['apple', 'oranges', ' ', 'mango', ' ', 'lemon'];
const transformedArray = array.map(item => item.trim() === '' ? 'empty string' : item);
console.log(transformedArray);

// Task 2: Using const with arrays and objects
const obj1 = {'key1': 1};
const obj2 = { ...obj1 };
if (obj2 === obj1) {
    console.log('same objects');
} else {
    console.log('different objects');
}

// Task 3: Output of the given code
const obj3 = {'key1': 1, 'key2': 2};
const obj4 = { ...obj3, key1: 1000 };

console.log(obj3);
console.log(obj4);
