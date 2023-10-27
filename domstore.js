let myObj = {
    name: "Donentc",
    age: 56
};

// Serialize the object to JSON and store it in local storage
let myObjSerialized = JSON.stringify(myObj);
localStorage.setItem("myObj", myObjSerialized);

// Retrieve the object from local storage and deserialize it
let myObjDeserialized = JSON.parse(localStorage.getItem("myObj"));

console.log(myObjDeserialized);
