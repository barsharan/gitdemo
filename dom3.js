// Create a new list item
var newItem = document.createElement('li');
newItem.textContent = 'New Item'; // Set the text content for the new item

// Add the new item to the existing list (ul)
var list = document.getElementById('items');
list.appendChild(newItem);

// Edit the new item using getElementsByClassName
var itemsWithClass = document.getElementsByClassName('list-group-item');
var newItemWithClass = itemsWithClass[itemsWithClass.length - 1]; // Get the last item with the class
newItemWithClass.style.backgroundColor = 'green'; // Change the background color

// Edit the new item using getElementsByTagName
var itemsWithTagName = document.getElementById('items').getElementsByTagName('li');
var newItemWithTagName = itemsWithTagName[itemsWithTagName.length - 1]; // Get the last item using getElementsByTagName
newItemWithTagName.style.fontWeight = 'bold'; // Make the font bold
newItem.style.padding = '10px'; // Adjust the padding as needed
newItem.style.border = '1px solid lightgrey'; // Add a 1px solid black border
newItem.style.listStyle = 'none'; // Add a 1px solid black border