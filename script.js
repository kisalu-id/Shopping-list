function changeItem() {
  var listItems = document.querySelectorAll("#shoppingList li");
  listItems.forEach(function(item) {
    item.classList.toggle("bought");
  });
}

//add button and quantity for each, button to add new. do nice design
