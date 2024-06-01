<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-buy list</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>

    <button id="LogIn">Login</button>


    <h1 id="mainTitle">To buy:</h1> 
    <nav>
        <div class="navPages">
            <ul>
                <li><input type="radio" id="tab1" name="tab" checked><label for="tab1" data-page="groceries">Groceries</label></li>
                <li><input type="radio" id="tab2" name="tab"><label for="tab2" data-page="drugstore">Drugstore</label></li>
                <li><input type="radio" id="tab3" name="tab"><label for="tab3" data-page="hardware-store">Hardware store</label></li>
                <li><input type="radio" id="tab4" name="tab"><label for="tab4" data-page="other">Other</label></li>
            </ul>
        </div>
    </nav>


    <div class="row">
        <input type="text" id="inputBox" placeholder="  Add an element">
        <input type="text" id="inputBoxQuantity" placeholder="  Quantity">
        <button onclick="addElement()">Add item</button>
    </div>


    <ul id="groceries" class="shoppingList">
        <li><span class="emoji">○</span> <span class="text">Item 1</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Item 2</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Item 3</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Item 4</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Item 5</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
    </ul>

    <ul id="drugstore" class="shoppingList" style="display: none;">
        <li><span class="emoji">○</span> <span class="text">Example item 1</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Example item 2</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
    </ul>

    <ul id="other" class="shoppingList" style="display: none;">
        <li><span class="emoji">○</span> <span class="text">Example 1</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
        <li><span class="emoji">○</span> <span class="text">Example 2</span> <button class="deleteBtn">x</button> <button class="quantityBtn increment">+</button> <span class="quantity">1</span> <button class="quantityBtn decrement">-</button> <button class="crossBtn">✓</button> <button class="editBtn">Edit</button></li>
    </ul>


    
    <div class="image-column left-column"></div>
    <div class="image-column right-column"></div>



    <!-- <button class="crossBtn">✓</button> <button class="addBtn">+</button> <button class="substrBtn">-</button> <button class="deleteBtn">x</button>
    -->
    <br />

    <p id="end">Have a nice day!</p>
    <button id="modeSwitchBtn" onclick="nightMode();">☀︎ / ☾</button>
    <script src="script.js"></script>
</body>
</html>

<!--
    frpm mobile move navig bar into hamburger
quantity - editable by clicking on text, by clicking on +-, can add that while creating new list element on top of the page
do several folders, to buy groceries, drogerie, household items, rest

-->
