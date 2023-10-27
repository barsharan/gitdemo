var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('input', filterItems); // Change event to 'input'

// Add item
function addItem(e) {
  e.preventDefault();

  // Get input values
  var newItem = document.getElementById('item').value;
  var description = document.getElementById('description').value;

  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add data attributes for name and description
  li.setAttribute('data-name', newItem.toLowerCase());
  li.setAttribute('data-description', description.toLowerCase());

  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
  li.appendChild(deleteBtn);

  // Append description
  var descriptionText = document.createElement('div');
  descriptionText.textContent = 'Description: ' + description;
  li.appendChild(descriptionText);

  // Append li to list
  itemList.appendChild(li);

  // Clear input fields
  document.getElementById('item').value = '';
  document.getElementById('description').value = '';
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Filter Items
function filterItems(e) {
  // Convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');

  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.getAttribute('data-name');
    var itemDescription = item.getAttribute('data-description');

    if (itemName.indexOf(text) !== -1 || itemDescription.indexOf(text) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
