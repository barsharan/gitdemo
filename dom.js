//console.log(document,getElementById('header-title'));
var header = document.getElementById('main-header');

header.style.borderBottom = 'solid 3px #000';



var items = document.getElementsByClassName('list-group-item'); 
console.log(items);
console.log(items[1]);
items[1].textContent = 'hello 2';
items[1].style.fontWeight = 'bold';
items[1].style.color = 'green';