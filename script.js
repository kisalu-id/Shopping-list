//camelCase
document.addEventListener('DOMContentLoaded', function () {
    var listItems = document.querySelectorAll("#shoppingList li");

    listItems.forEach(function(item) {
        crossOut(item);
        deleteButton(item);
        editButton(item);
    });

    var emojis = document.querySelectorAll("#shoppingList .emoji");
    var emojiList = ['○', '🐇', '🐢', '🗿'];

    emojis.forEach(function(emoji) {
        emoji.addEventListener('click', function() {
            var currEmoji = emoji.textContent.trim();
            var currIndex = emojiList.indexOf(currEmoji);
            var nextIndex = (currEmoji + 1) % emojiList.length; //ensures that when you reach the end of the array, you start back at the beginning
            emoji.textContent = emojiList[nextIndex];
        });
    });
});

function nightMode() {
    var body = document.body;
    body.classList.toggle('nightMode');
}

function addElement() {
    var inputBox = document.getElementById("inputBox");
    var inputValue = inputBox.value.trim(); //trim() removes whitespace from both ends of a string
    
    if (inputValue !== "") {
        var newListElement = document.createElement("li");

        var emojiSpan = document.createElement("span");
        emojiSpan.classList.add(emoji);
        emojiSpan.textContent = '○'; //?


        newListElement.textContent = inputValue; //textContent property of DOM elements, text content of the element 
        newListElement.appendChild(button);
        newListElement.appendChild(emojiSpan);

        var buttons = createButtons();
        buttons.forEach(button => {
            newListElement.appendChild(button);
        });
        document.getElementById("shoppingList").appendChild(newListElement);
        inputBox.value = "";
        crossOut(newListElement);
        deleteButton(newListElement);
        editButton(newListElement);
    }
}

document.getElementById("inputBox").addEventListener("keydown", function(event) {
    //check if the key pressed is the Enter key (key code 13)
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
    substrBtn.textContent = "-";
    substrBtn.classList.add("substrBtn");

    var addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.classList.add("addBtn");

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");

    return [deleteBtn, substrBtn, addBtn, crossBtn, editBtn];
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

function deleteButton(item) {
    var deleteBtn = item.querySelector(".deleteBtn");
    deleteBtn.addEventListener('click', function() {
        item.remove();
    });
}

function editButton(item) {
    var editButton = item.querySelector(".editBtn");
    editButton.addEventListener('click', function() {
        var existingText = item.textContent.trim();
        var newText = prompt("Edit element:", existingText);
        if (newText !== null && newText.trim() !== "") {
            item.inputValue = inputBox.trim();
        }
    });
} // ^ The <span> element is an inline container used to group text or other inline elements. 
//In the context of the script, the <span> element is used to separate the text content of the list item from the buttons.


//crossBtn, .addBtn, .substrBtn, .deleteBtn

  //add button and quantity (with options kg/Stk/packs) for each, button to add new. do nice design
  //add tags(specific shop, or type of shop, z. B. cosmetic shop or pharmacy)
  //each item has a crossout button, quantity, edit/delete option and option of tags to it. can create new items
  //crossed out items "sink", going after non-crossed items, on top of other crossed items
  //tags for "buy asap/not urgent/can wait for a long time"
