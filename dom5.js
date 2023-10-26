// Select the parent element of "Item Lister"
var mainHeader = document.getElementById('header-title');
var parentElement = mainHeader.parentElement;

// Create a new text node with the content "Hello World"
var helloWorldText = document.createTextNode('Hello World');

// Insert the "Hello World" text node before "Item Lister"
parentElement.insertBefore(helloWorldText, mainHeader);

// Select the first list item
var firstListItem = document.getElementById('items').firstElementChild;

// Create a new text node with the content "Hello World"
var helloWorldText2 = document.createTextNode('Hello World');

// Insert the "Hello World" text node before "Item 1"
firstListItem.insertBefore(helloWorldText2, firstListItem.firstChild);
