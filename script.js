
document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const shoppingLists = {
        groseries: document.getElementById("groceries"),
        drugstore: document.getElementById("drugstore"),
        hardwareStore: document.getElementById("hardwareStore"),
        other: document.getElementById("other")
    };

    var navPages = document.querySelectorAll('nav input[name="tab"]');
    var currPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
    var loginBtn = document.getElementById("LogIn");
    var inputBox = document.getElementById("inputBox");
    var inputBoxQuantity = document.getElementById("inputBoxQuantity");

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (target.matches('.shoppingList .deleteBtn')) {
            deleteItem(target.closest('li'));
        } else if (target.matches('.shoppingList .crossBtn')) {
            crossOut(target.closest('li'));
        } else if (target.matches('.shoppingList .editBtn')) {
            editButton(target.closest('li'));
        } else if (target.matches('.shoppingList .quantityBtn.increment')) {
            adjustQuantity(target.closest('li'), 1);
        } else if (target.matches('.shoppingList .quantityBtn.decrement')) {
            adjustQuantity(target.closest('li'), -1);
        } else if (target.matches('.emoji')) {
            toggleEmoji(target);
        } else if (target.matches('.menuBurger')) {
            navPages.classList.toggle('show');
        }
    });

    document.getElementById("loginButton").addEventListener('click', login);

    document.querySelectorAll('.shoppingList .emoji').forEach(addEmojiClickListener);
    document.getElementById("addItem").addEventListener("click", addElement);
    
    function crossOut(item) { /*
        var crossBtn = item.querySelector(".crossBtn");
        crossBtn.addEventListener('click', function() { */
        item.classList.toggle("bought");
    
        var list = item.parentNode;
        if (item.classList.contains("bought")) {
            list.appendChild(item);
        } else {
            var firstBoughtItem = list.querySelector(".bought");
            if (firstBoughtItem) {
                list.insertBefore(item, firstBoughtItem);
            }
        }
    }

    function deleteItem(item) {
        item.remove();
    }

    function editButton(item) {/*
        var editBtn = item.querySelector(".editBtn");
        editBtn.addEventListener('click', function() { */
        var textSpan = item.querySelector(".text");
        var existingText = textSpan.textContent.trim();
        var newText = prompt("Edit element:", existingText);
        if (newText !== null && newText.trim() !== "") {
            textSpan.textContent = newText.trim();
        }
    }

        

    function adjustQuantity(item, change) {
        var quantitySpan = item.querySelector(".quantity");
        var newQuantity = parseInt(quantitySpan.textContent);
        newQuantity = newQuantity + change;
        if (newQuantity > 0) {
            quantitySpan.textContent = newQuantity;
        } else {
            item.remove()
        }
    }


    


    function addEmojiClickListener(emoji) {
        var emojiList = ['○', '🐇', '🐢', '🗿'];
        emoji.addEventListener('click', function () {
            var currEmoji = emoji.textContent.trim();
            var CurrIndex = emojiList.indexOf(currEmoji);
            var nextIndex = (CurrIndex + 1) % emojiList.length;
            emoji.textContent = emojiList[nextIndex];
        });
    }



    document.getElementById("inputBox").addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            addElement();
        }
    });


    document.querySelectorAll('nav input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            const page = this.nextElementSibling.getAttribute('data-page');
            if (page) {
                window.location.href = page + '.html';
            }
        });
    });

});

function addElement() {

    const inputValue = document.getElementById('inputBox').value.trim();
    const inputQuantity = document.getElementById('inputBoxQuantity').value.trim() || '1';
    const currentPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
    const currentList = shoppingLists[currentPage];


    if (inputValue !== "") {

        const newListElement = document.createElement("li");

        const emojiSpan = document.createElement("span");
        emojiSpan.classList.add("emoji");
        emojiSpan.textContent = '○';

        const textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = inputValue;

        const quantitySpan = document.createElement("span");
        quantitySpan.classList.add("quantity");
        quantitySpan.textContent = inputQuantity;

        newListElement.appendChild(emojiSpan);
        newListElement.appendChild(textSpan);
        newListElement.appendChild(quantitySpan);

        const buttons = createButtons();
        buttons.forEach(button => {
            newListElement.appendChild(button);
        });

        currentList.appendChild(newListElement);

        inputBox.value = "";
        inputBoxQuantity.value = "";

        addEmojiClickListener(emojiSpan);
    }
}



function createButtons() {
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    var crossBtn = document.createElement("button");
    crossBtn.textContent = "✓";
    crossBtn.classList.add("crossBtn");

    var substrBtn = document.createElement("button");
    substrBtn.textContent = "+";
    substrBtn.classList.add("quantityBtn", "increment");


    var addBtn = document.createElement("button");
    addBtn.textContent = "-";
    addBtn.classList.add("quantityBtn", "decrement");

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");

    return [deleteBtn, substrBtn, addBtn, crossBtn, editBtn];
}


function nightMode() {
    var body = document.body;
    body.classList.toggle('nightMode');
}




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







//crossBtn, .addBtn, .substrBtn, .deleteBtn
//if quantity 0 crossOut()
//if crossOut set emoji to default

//add button and quantity (with options kg/pcs/packs) for each
//add tags(specific shop, or type of shop, z. B. cosmetic shop or pharmacy)
//each item has a crossout button, quantity, edit/delete option and option of tags to it. can create new items
//crossed out items "sink", going after non-crossed items, on top of other crossed items
//toggle tags (for item/list) for "buy asap/not urgent/can wait for a long time/NULL"
//add multiple pages or sections. toggle tags

    //event delegation is the process of handling events on a parent element instead of binding the event listener to each child element individually

    

    //getElementById("shoppingList") returns a single element object representing the element

    //event delegation is the process of handling events on a parent element instead of binding the event listener to each child element individually 
//getElementById("shoppingList") returns a single element object representing the element 
    //is used when you want to manipulate the shoppingList element itself or when you want to use event delegation to handle events for its children 
