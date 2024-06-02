
document.addEventListener('DOMContentLoaded', function () {
    var shoppingLists = { //dict to map each tab name to its corresponding ul
        groseries: document.getElementById("groceries"),
        drugstore: document.getElementById("drugstore"),
        hardwareStore: document.getElementById("hardwareStore"),
        other: document.getElementById("other")
    }
    //event delegation is the process of handling events on a parent element instead of binding the event listener to each child element individually
    //getElementById("shoppingList") returns a single element object representing the element 
    //is used when you want to manipulate the shoppingList element itself or when you want to use event delegation to handle events for its children
    var navPages = document.querySelectorAll('nav input[name="tab"]');
    var currPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
    var loginBtn = document.getElementById("LogIn");
    var inputBox = document.getElementById("inputBox");
    var inputBoxQuantity = document.getElementById("inputBoxQuantity");


    navPages.forEach(function(radio) {
        switchTab.addEventListener('change', function() {
            currPage = this.nextElementSibling.getAttribute('data-page');
            switchTab(currPage);
        });
    });

    function switchTab(page) {
        for (var list in shoppingLists) {
            shoppingLists[list].style.display = 'none'; //hide all tabs
        }
        //display shopping list for currently selected tab
        //determined my data-page attribute of label element associated with selected radio button
        shoppingLists[page].style.display = 'block'; //page holds category name of curr tab;
    }

    //add event listeners
    var tabs = document.querySelectorAll('input[name="tab"]');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var pageId = this.nextElementSibling.getAttribute('data-page');
            switchTab(pageId);
        });
    });
    var initialPageId = document.querySelector('input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
    switchTab(initialPageId);


    
    //a common way to define an event listener function where e stands for the event object
    //this event object contains a lot of information about the event that occurred
    //anonymous function that takes one parameter e, which is the event object
    //is typically used as a callback for event listeners
    /*shoppingList.addEventListener('click', function (e) { //e is the event object, automatically passed to the event handler function when an event occurs
        if (e.target && e.target.classList.contains('deleteBtn')) {
            deleteItem()
        }


    }); 

    listItems.forEach(function(item) {
        crossOut(item);
        deleteButton(item);
        editButton(item);
        quantityButtons(item);

        var emoji = item.querySelector(".emoji");
        addEmojiClickListener(emoji);
    }); */

});

function nightMode() {
    var body = document.body;
    body.classList.toggle('nightMode');
}


function addElement() {
    var inputValue = inputBox.value.trim();
    var inputQuantity = inputBoxQuantity.value.trim(); //trim() removes whitespace from both ends of a string
    
    if (inputValue !== "") {
        var currentPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
        var currentList = shoppingLists[currentPage];
        
        var newListElement = document.createElement("li");

        var emojiSpan = document.createElement("span");
        emojiSpan.classList.add("emoji");
        emojiSpan.textContent = '○'; //? 

        var textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = inputValue;

        var quantitySpan = document.createElement("span");
        quantitySpan.classList.add("quantity");
        quantitySpan.textContent = inputQuantity? inputQuantity : '1';

        newListElement.appendChild(emojiSpan);
        newListElement.appendChild(textSpan);
        newListElement.appendChild(quantitySpan); //ik its wrong but for now it will be like thatt



        var buttons = createButtons();
        buttons.forEach(button => {
            newListElement.appendChild(button);
        });
        document.getElementById("shoppingList").appendChild(newListElement);
        inputBox.value = "";
        inputBoxQuantity.value = "";
        crossOut(newListElement);
        deleteButton(newListElement);
        editButton(newListElement);
        addEmojiClickListener(emojiSpan);
        quantityButtons(item);
    }
}

document.getElementById("inputBox").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        addElement();
    }
});

function createButtons() {
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    var crossBtn = document.createElement("button");
    crossBtn.textContent = "✓";
    crossBtn.classList.add("crossBtn");



    var substrBtn = document.createElement("button");
    substrBtn.textContent = "+";
    substrBtn.classList.add(".quantityBtn.increment");

    var quantity = document.createElement("span");
    quantity.textContent = "1";
    quantity.classList.add("quantity");

    var addBtn = document.createElement("button");
    addBtn.textContent = "-";
    addBtn.classList.add(".quantityBtn.decrement");

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");

    return [deleteBtn, substrBtn, quantity, addBtn, crossBtn, editBtn];
}

function crossOut(item) {
    var crossBtn = item.querySelector(".crossBtn");
    crossBtn.addEventListener('click', function() {
        item.classList.toggle("bought");

        var list = document.getElementById("shoppingList");
        if (item.classList.contains("bought")) {
            list.appendChild(item);
        } else {
            var firstBoughtItem = list.querySelector(".bought");
            if (firstBoughtItem) {
                list.insertBefore(item, firstBoughtItem);
            }
        }
    });
}

function deleteItem(item) {
    item.remove();
}

function editButton(item) {
    var editBtn = item.querySelector(".editBtn");
    editBtn.addEventListener('click', function() {
        var textSpan = item.querySelector(".text");
        var existingText = item.Childnodes[1].nodeValue.trim();
        var newText = prompt("Edit element:", existingText);
        if (newText !== null && newText.trim() !== "") {
            item.Childnodes[1].nodeValue = newText.trim();
        }
    });
} // ^ The <span> element is an inline container used to group text or other inline elements. 
  //In the context of the script, the <span> element is used to separate the text content of the list item from the buttons.

function addEmojiClickListener(emoji) {
    var emojiList = ['○', '🐇', '🐢', '🗿'];
    emoji.addEventListener('click', function() {
    var currEmoji = emoji.textContent.trim();
    var CurrIndex = emojiList.indexOf(currEmoji);
    var nextIndex = (CurrIndex + 1) % emojiList.length;
    emoji.textContent = emojiList[nextIndex];
    });
}

function qquantityButtons(item) {
    var incrementBtn = item.querySelector(".quantityBtn.increment");
    var decrementBtn = item.querySelector(".quantityBtn.decrement");
    var quantitySpan = item.querySelector(".quantity");

    incrementBtn.addEventListener('click', function() {
        var quantity = quantitySpan.textContent;
        quantitySpan.textContent = quantity +1;
    });

    decrementBtn.addEventListener('click', function() {
        var quantity = quantitySpan.textContent;
        if (quantity > 1) {
        quantitySpan.textContent = quantity - 1;
        } else {
            deleteButton(item);
        }
    });



}
  //crossBtn, .addBtn, .substrBtn, .deleteBtn

//if quantity 0 crossOut()
//if crossOut set emoji to default

  //add button and quantity (with options kg/pcs/packs) for each
  //add tags(specific shop, or type of shop, z. B. cosmetic shop or pharmacy)
  //each item has a crossout button, quantity, edit/delete option and option of tags to it. can create new items
  //crossed out items "sink", going after non-crossed items, on top of other crossed items
  //toggle tags (for item/list) for "buy asap/not urgent/can wait for a long time/NULL"
  //add multiple pages? or sections. toggle tags
