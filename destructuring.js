const obj1 = {'key1': 1, "key2": 2, "key3": 1000};
const { key1, key3 } = { ...obj1 };
console.log(key1, key3);


const arr1 = ['value1', 'value2'];
const [ val1, val2 ] = arr1;
console.log(val1);
console.log(val2);
