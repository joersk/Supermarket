const prices = {
    "Apples": 900.00,
    "Banana": 560.00,
    "Grapes": 2500.00,
    "Oranges": 2800.00,
    "Guava": 850.00,
    "Pineapple": 1800.00,
    "Onions": 300.00,
    "Carrots": 700.00,
    "Eggplant": 650.00,
    "Potato": 875.00,
    "Leeks": 400.00,
    "Cabbage": 550.00,
    "Chicken": 1300.00,
    "Fish": 1800.00,
    "Prawns": 2300.00,
    "Beef": 4000.00,
    "Yogurt": 80.00,
    "Freshmilk": 140.00,
    "Curd": 220.00,
    "Egg": 60.00,
    "Cheese": 1100.00,
    "Butter": 1000.00,
    "Flour": 890.00,
    "Sugar": 250.00,
    "Spices": 200.00,
    "Powder": 100.00,
    "Salt": 140.00,
    "Oil": 600.00
};

function items_dropdown(section) {
    const dropdown = section.querySelector("select");
    return dropdown ? dropdown.value : null;
}

function addRowToTable(dropdown, quantity, isSpecial, price) {
    const tBody = document.querySelector('.order tbody');
    const newRow = tBody.insertRow();

    const itemcol = newRow.insertCell(0);
    const quantitycol = newRow.insertCell(1);
    const pricecol = newRow.insertCell(2);
    const totalcol = newRow.insertCell(3);

    itemcol.innerText = dropdown;
    quantitycol.innerText = isSpecial ? quantity + " kg" : quantity;
    pricecol.innerText = (price / 1).toFixed(2); // Convert price to float
    totalcol.innerText = ((price / 1) * quantity).toFixed(2); // Calculate total price

    updateTotalPrice();
}

function getTable(section) {
    const dropdown = items_dropdown(section);
    const quantity = section.querySelector("input[type='number']").value;

    const isSpecial = ["fruits", "vegetables", "meat"].includes(section.querySelector("select").id);

    if (dropdown && quantity && !isNaN(quantity) && prices[dropdown]) {
        addRowToTable(dropdown, parseFloat(quantity), isSpecial, prices[dropdown]);
    } else {
        alert("Please select an item and enter a valid quantity.");
    }
}

function updateTotalPrice() {
    const totalPriceCol = document.getElementById('total-price');
    const rows = document.querySelectorAll('.order tbody tr');
    let total = 0;

    rows.forEach(row => {
        const totalCol = row.cells[3]; 
        total += parseFloat(totalCol.innerText);
    });

    totalPriceCol.innerText = total.toFixed(2);
}

function saveToFavorites() {
    const rows = document.querySelectorAll('.order tbody tr');
    const favorites = Array.from(rows).map(row => {
        return {
            item: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText,
            total: row.cells[3].innerText
        };
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Favorites saved!");
}

function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites && favorites.length > 0) {
        const tBody = document.querySelector('.order tbody');
        tBody.innerHTML = ''; // Clear the current table

        favorites.forEach(fav => {
            const newRow = tBody.insertRow();

            const itemcol = newRow.insertCell(0);
            const quantitycol = newRow.insertCell(1);
            const pricecol = newRow.insertCell(2);
            const totalcol = newRow.insertCell(3);

            itemcol.innerText = fav.item;
            quantitycol.innerText = fav.quantity;
            pricecol.innerText = fav.price;
            totalcol.innerText = fav.total;
        });

        updateTotalPrice();
        alert("Favorites applied!");
    } else {
        alert("No favorites found!");
    }
}

document.querySelectorAll('.product-section button').forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = event.target.closest('.product-section');
        getTable(section);
    });
});

document.getElementById('save-favorites').addEventListener("click", saveToFavorites);
document.getElementById('apply-favorites').addEventListener("click", applyFavorites);

function saveOrderToLocalStorage() {
    const rows = document.querySelectorAll('.order tbody tr');
    const order = Array.from(rows).map(row => {
        return {
            item: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText,
            total: row.cells[3].innerText
        };
    });
    localStorage.setItem('order', JSON.stringify(order));
}

document.getElementById('buy-now').addEventListener("click", () => {
    saveOrderToLocalStorage();
    window.location.href = 'Order Process.html'; // Replace with the actual URL of your order form page
});





