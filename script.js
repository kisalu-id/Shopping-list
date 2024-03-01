function changeItem() {
  var listItems = document.querySelectorAll("#shoppingList li");
  listItems.forEach(function(item) {
    item.classList.toggle("bought");
  });
}

function nightMode() {
  var body = document.body;
  body.classList.toggle('nightMode');
}
//add button and quantity (with options kg/Stk/packs) for each, button to add new. do nice design
//add tags(specific shop, or type of shop, z. B. cosmetic shop or pharmacy)
//each item has a crossout button, quantity, edit/delete option and option of tags to it. can create new items
//crossed out items "sink", going after non-crossed items, on top of other crossed items
//tags for "buy asap/not urgent/can wait for a long time"
