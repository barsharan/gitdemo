var thirdListItem = document.getElementById('items').getElementsByTagName('li')[2];

// Change its background color to green
thirdListItem.style.backgroundColor = 'green';
var listItems = document.getElementById('items').getElementsByTagName('li');

for (var i = 0; i < listItems.length; i++) {
    listItems[i].style.fontWeight = 'bold';
  }