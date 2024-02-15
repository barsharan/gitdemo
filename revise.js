
const product = (num1, num2) => num1 * num2;

console.log(product(5, 3)); 

// Creating a student object
const student = {
  firstName: "Barsha",
  lastName: "Das",
  age: 24,
  grade: "A",
  getInfo: function() {
    return `${this.firstName} ${this.lastName}, Age: ${this.age}, Grade: ${this.grade}`;
  }
};

console.log(student.getInfo()); 
