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

    const dayImages = ['SL-day-mode.png', 'SL-day-mode1.png', 'SL-day-mode2.png'];
    const nightImages = ['SL-night-mode.png', 'SL-night-mode1.png', 'SL-night-mode2.png'];

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
        }   else if (target.closest('.left-column, .right-column')) {
            cycleImages();
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

    function addEnterKeyListener(elementId) {
        document.getElementById(elementId).addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                addElement();
            }
        });
    }
    addEnterKeyListener("inputBox");
    addEnterKeyListener("inputBoxQuantity");


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
        const currPage = document.querySelector('nav input[name="tab"]:checked').nextElementSibling.getAttribute('data-page');
        const currList = shoppingLists[currPage];
        const inputValue = document.getElementById('inputBox').value.trim();
        if (currPage !== "todo") {
            const inputQuantity = document.getElementById('inputBoxQuantity').value.trim() || '1';
        }

        if (inputValue !== "" && currPage !== "todo") {
            if (!/^\d+(\.\d+)?$/.test(inputQuantity) || parseFloat(inputQuantity) <= 0) {
                alert('Please enter a valid positive number for quantity.');
                return;
            }
        }
            const newListElement = document.createElement("li");
            const emojiSpan = document.createElement("span");
            
            emojiSpan.classList.add("emoji");
            emojiSpan.textContent = '○';
    
            const textSpan = document.createElement("span");
            textSpan.classList.add("text");
            textSpan.textContent = inputValue;

            newListElement.appendChild(emojiSpan);
            newListElement.appendChild(textSpan);
    
            if (currPage === "todo") {
                buttons = createButtons(null);
            } else { 
                buttons = createButtons(inputQuantity);  //so the function createButtons will not add quantity
            }

            buttons.forEach(button => {
                newListElement.appendChild(button);  //for todo I also need buttons, just less
            });
            
            currList.appendChild(newListElement);
    
            document.getElementById('inputBox').value = "";
            if (currPage !== "todo") {
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

        if (inputQuantity !== null) {
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



    var dayIndex = 0;
    var nightIndex = 0;
    
    leftColumn.style.backgroundImage = `url('${images[index]}')`;
    rightColumn.style.backgroundImage = `url('${images[index]}')`;

    function cycleImages() {
        const isNightMode = document.body.classList.contains('nightMode');
        var images = isNightMode ? nightImages : dayImages;
        var index = isNightMode ? nightIndex : dayIndex;


        index = (index + 1) % images.length;


        const leftColumn = document.querySelector('.left-column');
        const rightColumn = document.querySelector('.right-column');

        leftColumn.style.backgroundImage = `url('${images[index]}')`;
        rightColumn.style.backgroundImage = `url('${images[index]}')`;

        if (isNightMode) {
            
            nightIndex = index;
        } else {
            dayIndex = index;
        }
    }
    //TODO: write explanatory comments
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
