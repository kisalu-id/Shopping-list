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
    var loginBtn = document.getElementById("LogIn");
    var inputBox = document.getElementById("inputBox");
    var inputBoxQuantity = document.getElementById("inputBoxQuantity");

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
        } else if (target.matches('.menuBurger')) {
            navPages.forEach(page => page.classList.toggle('show'));
        }
    });

    document.getElementById("loginButton").addEventListener('click', login);
    document.querySelectorAll('.shoppingList .emoji').forEach(toggleEmoji);
    document.getElementById("addItem").addEventListener("click", addElement);
    document.getElementById('header').addEventListener('click', openBurger);
    
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

    var menuBurger = document.querySelector('.menuBurger');
    menuBurger.addEventListener('click', function() {
        menuBurger.classList.toggle('change');
    });

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


    


    function toggleEmoji(emoji) {
        var emojiList = ['○', '🐇', '🐢', '🗿'];
        emoji.addEventListener('click', function () {
            var currEmoji = emoji.textContent.trim();
            var currIndex = emojiList.indexOf(currEmoji);
            var nextIndex = (currIndex + 1) % emojiList.length;
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
    
            if (currPage != todo) {
                const quantitySpan = document.createElement("span");
                quantitySpan.classList.add("quantity");
                quantitySpan.textContent = inputQuantity;
            }

    
            newListElement.appendChild(emojiSpan);
            newListElement.appendChild(textSpan);
            if (currPage != todo) {
                newListElement.appendChild(quantitySpan);
                const buttons = createButtons();
                buttons.forEach(button => {
                    newListElement.appendChild(button);
                });
            }
            else if (currPage == todo) {

            }
            currentList.appendChild(newListElement);
    
            inputBox.value = "";
            inputBoxQuantity.value = "";
    
            toggleEmoji(emojiSpan);
            crossOut(newListElement);
            deleteItem(newListElement);
            editButton(newListElement);
            quantityButtons(newListElement);
        }
    }

});




function createButtons() {
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    var crossBtn = document.createElement("button");
    crossBtn.textContent = "✓";
    crossBtn.classList.add("crossBtn");

    if (currPage != todo) {
        var substrBtn = document.createElement("button");
        substrBtn.textContent = "+";
        substrBtn.classList.add("quantityBtn", "increment");
    
        var addBtn = document.createElement("button");
        addBtn.textContent = "-";
        addBtn.classList.add("quantityBtn", "decrement");
    }

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");

    if (currPage != todo) {
        return [deleteBtn, substrBtn, addBtn, crossBtn, editBtn];
    } else {
        return [deleteBtn, crossBtn, editBtn];
    }
}




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
