// order-form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    const deliveryInfo = document.getElementById('delivery-info');
    const deliveryDateElem = document.getElementById('delivery-date');

    // Add event listener to the form
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Calculate the delivery date
        const currentDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 1.5); // Set delivery date to 1.5

        // Format the delivery date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

        // Display the delivery information
        deliveryDateElem.innerText = formattedDate;
        deliveryInfo.style.display = 'block';
    });

    // Populate the order table with items from localStorage
    const order = JSON.parse(localStorage.getItem('order'));
    const orderDetails = document.getElementById('order-details');
    let total = 0;

    if (order && order.length > 0) {
        order.forEach(item => {
            const newRow = document.createElement('tr');

            const itemcol = document.createElement('td');
            itemcol.innerText = item.item;
            newRow.appendChild(itemcol);

            const quantitycol = document.createElement('td');
            quantitycol.innerText = item.quantity;
            newRow.appendChild(quantitycol);

            const pricecol = document.createElement('td');
            pricecol.innerText = item.price;
            newRow.appendChild(pricecol);

            const totalcol = document.createElement('td');
            totalcol.innerText = item.total;
            newRow.appendChild(totalcol);

            orderDetails.appendChild(newRow);

            total += parseFloat(item.total);
        });

        document.getElementById('total-price').innerText = total.toFixed(2);
    }
});
