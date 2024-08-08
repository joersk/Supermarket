// order-form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    const deliveryInfo = document.getElementById('delivery-info');
    const deliveryDateElem = document.getElementById('delivery-date');

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const currentDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 1.5);

        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

        
        deliveryDateElem.innerText = formattedDate;
        deliveryInfo.style.display = 'block';
    });

    
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


document.addEventListener('DOMContentLoaded', function () {
    const cardOption = document.getElementById('card');
    const cashOption = document.getElementById('cash');
    const cardDetails = document.getElementById('card-details');

    cardOption.addEventListener('change', function () {
        if (cardOption.checked) {
            cardDetails.style.display = 'block';
        }
    });

    cashOption.addEventListener('change', function () {
        if (cashOption.checked) {
            cardDetails.style.display = 'none';
        }
    });
});
