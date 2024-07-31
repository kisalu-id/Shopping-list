document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const shoppingLists = {
        groceries: document.getElementById("groceries"),
        drugstore: document.getElementById("drugstore"),
        hardwareStore: document.getElementById("hardwareStore"),
        other: document.getElementById("other"),
        todo: document.getElementById("todo")
    };

    var navPages = document.querySelectorAll('nav input[name="tab"]');
    var currPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
    const loginBtn = document.getElementById("LogIn");
    const inputBox = document.getElementById("inputBox");
    const inputBoxQuantity = document.getElementById("inputBoxQuantity");


    document.addEventListener('click', function (event) {
        const target = event.target;
        listItem = target.closest('li')
        if (target.matches('.shoppingList .deleteBtn')) {
            deleteItem(listItem);
        } else if (target.matches('.shoppingList .crossBtn')) {
            crossOut(listItem);
        } else if (target.matches('.shoppingList .editBtn')) {
            editButton(listItem);
        } else if (target.matches('.shoppingList .quantityBtn.increment')) {
            adjustQuantity(listItem, 1);
        } else if (target.matches('.shoppingList .quantityBtn.decrement')) {
            adjustQuantity(listItem, -1);
        } else if (target.matches('.emoji')) {
            toggleEmoji(target);
        } else if (target.matches('#loginButton')) {
            login();
        } else if (target.matches('#addItem')) {
            addElement();
        } else if (target.matches('#menuBurger, #menuBurger *')) {
            openBurger(target);
        } else if (target.matches('#modeSwitchBtn')) {
            nightMode();
        }
    });


    function openBurger(target) {
        document.getElementById('menuBurger').classList.toggle('change');
        document.querySelector('.navPages').classList.toggle('show');
    }

    function crossOut(item) { 
        item.classList.toggle("bought");

        if (item.classList.contains("bought")) {
            var emoji = item.querySelector('.emoji');
            if (emoji) {
                resetEmoji(emoji);
            }
        }

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


    function resetEmoji(emoji) {
        emoji.textContent = '○';
    }


    function deleteItem(item) {
        item.remove();
    }


    function editButton(item) {
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

    
    function toggleEmoji(emoji) {
        var emojiList = ['○', '🐇', '🐢', '🗿'];
        var currEmoji = emoji.textContent.trim();
        var currIndex = emojiList.indexOf(currEmoji);
        var nextIndex = (currIndex + 1) % emojiList.length;
        emoji.textContent = emojiList[nextIndex];
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

    function addElement() {
        var buttons;
        const inputValue = document.getElementById('inputBox').value.trim();
        const inputQuantity = document.getElementById('inputBoxQuantity').value.trim() || '1';
        const currPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
        const currentList = shoppingLists[currPage];
    
        if (inputValue !== "") {
            const newListElement = document.createElement("li");
            const emojiSpan = document.createElement("span");
            
            emojiSpan.classList.add("emoji");
            emojiSpan.textContent = '○';
    
            const textSpan = document.createElement("span");
            textSpan.classList.add("text");
            textSpan.textContent = inputValue;

            newListElement.appendChild(emojiSpan);
            newListElement.appendChild(textSpan);
    
            if (currPage !== "todo") {
                buttons = createButtons(inputQuantity);
            } else { 
                buttons = createButtons(null);  //so the function createButtons will not add quantity
            }

            buttons.forEach(button => {
                newListElement.appendChild(button);  //for todo I also need buttons, just less
            });
            
            currentList.appendChild(newListElement);
    
            document.getElementById('inputBox').value = "";
            document.getElementById('inputBoxQuantity').value = "";
        }
    }
    

    function createButtons(inputQuantity) {
        var buttons = [];

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = '✕';
        buttons.push(deleteBtn);

        const crossBtn = document.createElement("button");
        crossBtn.classList.add('crossBtn')
        crossBtn.textContent = "✓";
        buttons.push(crossBtn);
    
        const editBtn = document.createElement("button");
        editBtn.classList.add('editBtn')
        editBtn.textContent = "Edit";
        buttons.push(editBtn);

        if (inputQuantity) {
            const addBtn = document.createElement("button");
            addBtn.classList.add('quantityBtn', 'increment')
            addBtn.textContent = "+";
            buttons.push(addBtn);

            const quantitySpan = document.createElement("span");
            quantitySpan.classList.add("quantity");
            quantitySpan.textContent = inputQuantity;
            buttons.push(quantitySpan);

            const substrBtn = document.createElement("button");
            substrBtn.classList.add('quantityBtn', 'decrement')
            substrBtn.textContent = "-";
            buttons.push(substrBtn);
        }
        return buttons;
    }
});





function nightMode() {
    var body = document.body;
    body.classList.toggle('nightMode');
}




function login() {
    
}


function openBurger() {
    document.getElementById('menuBurger').classList.toggle('change');
    document.querySelector('.navPages').classList.toggle('show');
}



//TODO
//quantity - editable by clicking on text, by clicking on +-, can add that while creating new list element on top of the page

//add button and quantity (with options kg/pcs/packs) for each
//add pharmacy, clothes, ?


//DESCRIPTION
//each item has a crossout button, quantity, edit/delete option and option of tags to it. can create new items
//if quantity is 0, then crossOut()
//crossed out items "sink", going after non-crossed items, on top of other crossed items
//toggle tags (for item/list) for "buy asap/not urgent/can wait for a long time/NULL"
//multiple pages




//NOTES
//getElementById("shoppingList") returns a single element object representing the element

//event delegation is the process of handling events on a parent element instead of binding the event listener to each child element individually 
//getElementById("shoppingList") returns a single element object representing the element 
//is used when you want to manipulate the shoppingList element itself or when you want to use event delegation to handle events for its children 


//a common way to define an event listener function where e stands for the event object
//this event object contains a lot of information about the event that occurred
//anonymous function that takes one parameter e, which is the event object
//is typically used as a callback for event listeners
//crossBtn, .addBtn, .substrBtn, .deleteBtn

