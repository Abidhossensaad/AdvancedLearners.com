// Initialize cart in localStorage if it's not already present
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

function addToCart(courseName, price) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Check if the course is already in the cart
    let course = cart.find(item => item.name === courseName);

    if (course) {
        course.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ name: courseName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    window.location.href = 'cart.html'; // Redirect to cart page
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement('tr');

        let courseCell = document.createElement('td');
        courseCell.textContent = item.name;
        row.appendChild(courseCell);

        let priceCell = document.createElement('td');
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        let quantityCell = document.createElement('td');
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', () => updateQuantity(index, quantityInput.value));
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        let totalCell = document.createElement('td');
        totalCell.textContent = item.price * item.quantity;
        row.appendChild(totalCell);

        let removeCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn-remove');
        removeButton.addEventListener('click', () => removeFromCart(index));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        cartItemsContainer.appendChild(row);

        total += item.price * item.quantity; // Update total
    });

    document.getElementById('total-amount').textContent = `BDT ${total}`;
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (newQuantity < 1) newQuantity = 1; // Prevent quantity from being less than 1
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Re-render cart
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Re-render cart
}

function checkout() {
    alert("Proceeding to checkout!");
}

updateCart();
